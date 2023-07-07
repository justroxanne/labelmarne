-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `address_number` INT NULL,
  `type` VARCHAR(90) NOT NULL,
  `street_name` VARCHAR(255) NOT NULL,
  `complement` VARCHAR(255) NULL,
  `zip_code` INT NOT NULL,
  `city` VARCHAR(90) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(90) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(90) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `label`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `label` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(90) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`id`, `category_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `fk_label_category1_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_label_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `step`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `step` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(90) NOT NULL,
  `created_at` DATE NOT NULL,
  `updated_at` DATE NULL,
  `status_id` INT NOT NULL,
  `label_id` INT NOT NULL,
  PRIMARY KEY (`id`, `status_id`, `label_id`),
  INDEX `fk_step_status1_idx` (`status_id` ASC) VISIBLE,
  INDEX `fk_step_label1_idx` (`label_id` ASC) VISIBLE,
  CONSTRAINT `fk_step_status1`
    FOREIGN KEY (`status_id`)
    REFERENCES `status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_step_label1`
    FOREIGN KEY (`label_id`)
    REFERENCES `label` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user` (
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
  `step_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_address_idx` (`address_id` ASC) VISIBLE,
  INDEX `fk_user_step1_idx` (`step_id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  CONSTRAINT `fk_user_address`
    FOREIGN KEY (`address_id`)
    REFERENCES `address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_step1`
    FOREIGN KEY (`step_id`)
    REFERENCES `step` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(90) NOT NULL,
  `lastname` VARCHAR(90) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(90) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user_has_label`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user_has_label` (
  `user_id` INT NOT NULL,
  `label_id` INT NOT NULL,
  INDEX `fk_user_has_label_label1_idx` (`label_id` ASC) VISIBLE,
  INDEX `fk_user_has_label_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_label_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_label_label1`
    FOREIGN KEY (`label_id`)
    REFERENCES `label` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
