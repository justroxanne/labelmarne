-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema la_marne_labels
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema la_marne_labels
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `la_marne_labels` DEFAULT CHARACTER SET utf8 ;
USE `la_marne_labels` ;

-- -----------------------------------------------------
-- Table `la_marne_labels`.`addresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `la_marne_labels`.`addresses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `number` INT,
  `type` VARCHAR(90) NOT NULL,
  `street_name` VARCHAR(255) NOT NULL,
  `complement` VARCHAR(255),
  `zip_code` INT NOT NULL,
  `city` VARCHAR(90) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `la_marne_labels`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `la_marne_labels`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(90) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `la_marne_labels`.`status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `la_marne_labels`.`status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(90) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `la_marne_labels`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `la_marne_labels`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(90) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `la_marne_labels`.`labels`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `la_marne_labels`.`labels` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(90) NOT NULL,
  `logo` VARCHAR(255) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`id`, `category_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `fk_label_category1_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_label_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `la_marne_labels`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `la_marne_labels`.`steps`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `la_marne_labels`.`steps` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(90) NOT NULL,
  `status_id` INT NOT NULL,
  `label_id` INT NOT NULL,
  PRIMARY KEY (`id`, `status_id`, `label_id`),
  INDEX `fk_step_status1_idx` (`status_id` ASC) VISIBLE,
  INDEX `fk_step_label1_idx` (`label_id` ASC) VISIBLE,
  CONSTRAINT `fk_step_status1`
    FOREIGN KEY (`status_id`)
    REFERENCES `la_marne_labels`.`status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_step_label1`
    FOREIGN KEY (`label_id`)
    REFERENCES `la_marne_labels`.`labels` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `la_marne_labels`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `la_marne_labels`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(255) NOT NULL,
  `firstname` VARCHAR(80) NOT NULL,
  `lastname` VARCHAR(80) NOT NULL,
  `siret` VARCHAR(14) NOT NULL COMMENT '14 chiffres obligatoires',
  `phone` VARCHAR(40) NOT NULL,
  `email` VARCHAR(90) NOT NULL,
  `password` VARCHAR(90) NOT NULL,
  `website_url` VARCHAR(90) NULL,
  `address_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  `status_id` INT NOT NULL,
  `step_id` INT NOT NULL,
  PRIMARY KEY (`id`, `address_id`, `role_id`, `status_id`, `step_id`),
  INDEX `fk_user_address_idx` (`address_id` ASC) VISIBLE,
  INDEX `fk_user_role1_idx` (`role_id` ASC) VISIBLE,
  INDEX `fk_user_status1_idx` (`status_id` ASC) VISIBLE,
  INDEX `fk_user_step1_idx` (`step_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_address`
    FOREIGN KEY (`address_id`)
    REFERENCES `la_marne_labels`.`addresses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `la_marne_labels`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_status1`
    FOREIGN KEY (`status_id`)
    REFERENCES `la_marne_labels`.`status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_step1`
    FOREIGN KEY (`step_id`)
    REFERENCES `la_marne_labels`.`steps` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `la_marne_labels`.`admins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `la_marne_labels`.`admins` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(90) NOT NULL,
  `lastname` VARCHAR(90) NOT NULL,
  `email` VARCHAR(90) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `status_id` INT NOT NULL,
  PRIMARY KEY (`id`, `status_id`),
  INDEX `fk_admin_status1_idx` (`status_id` ASC) VISIBLE,
  CONSTRAINT `fk_admin_status1`
    FOREIGN KEY (`status_id`)
    REFERENCES `la_marne_labels`.`status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `la_marne_labels`.`users_has_labels`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `la_marne_labels`.`users_has_labels` (
  `user_id` INT NOT NULL,
  `label_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `label_id`),
  INDEX `fk_user_has_label_label1_idx` (`label_id` ASC) VISIBLE,
  INDEX `fk_user_has_label_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_label_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `la_marne_labels`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_label_label1`
    FOREIGN KEY (`label_id`)
    REFERENCES `la_marne_labels`.`labels` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
