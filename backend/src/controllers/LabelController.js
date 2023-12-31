const BaseController = require('./BaseController');
const { LabelModel } = require('../models');

class LabelController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = new LabelModel();
  }

  async newLabel() {
    const { name, url } = this.req.body;
    const categoryId = this.req.body.category_id;

    try {
      if (!name || !url || !categoryId) {
        throw new Error('Veuillez remplir tous les champs');
      }

      const labelData = {
        name,
        url,
      };
      if (this.req.file) {
        labelData.logo = this.req.file.filename;
      }

      const [result] = await this.model.createLabel(labelData, categoryId);

      if (result.affectedRows !== 0) {
        return this.res.status(201).json({
          message: 'Label créé avec succès',
          id: result.insertId,
          name: labelData.name,
          url: labelData.url,
          logo: labelData.logo,
          category_id: labelData.category_id,
        });
      }
    } catch (error) {
      this.res.status(500).json({ error: error.message });
    }
  }

  getLogo() {
    return new Promise((resolve, reject) => {
      upload.single('logo')(this.req, this.res, (err) => {
        //utilise le middleware multer
        if (err) {
          reject(err); //renvoie une erreur si il y a un problème
        } else {
          resolve(this.req.file ? this.req.file.path : null); //renvoie le chemin de l'image
        }
      });
    });
  }
}

module.exports = LabelController;
