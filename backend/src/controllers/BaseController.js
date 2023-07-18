class BaseController {
  req;
  res;
  model;

  constructor(req, res, model) {
    this.req = req;
    this.res = res;
    this.model = model;
  }

  async getAll() {
    try {
      const [results] = await this.model.getAll();
      if (this.model.table === 'user' || this.model.table === 'admin') {
        results.forEach((result) => delete result.password);
      }
      this.res.status(200).json(results);
    } catch (err) {
      console.error(err);
      this.res.status(500).json({ message: 'Something went wrong' });
    }
  }

  async getOne() {
    try {
      const [results] = await this.model.getOne(this.req.params);
      if (this.model.table === 'user' || this.model.table === 'admin') {
        results.forEach((result) => delete result.password);
      }
      this.res.status(200).json(results);
    } catch (err) {
      console.error(err);
      this.res.status(500).json({ message: 'Something went wrong' });
    }
  }

  async create() {
    try {
      const [result] = await this.model.create(this.req.body);
      this.res
        .status(201)
        .location(`${this.req.baseUrl}/${this.table}/${result.insertId}`)
        .json({
          message: 'Success',
          id: result.insertId,
          ...this.req.body,
        });
    } catch (err) {
      console.error(err);
      this.res.status(500).json({ message: 'Something went wrong' });
    }
  }

  async update() {
    try {
      const [result] = await this.model.update(this.req.params, this.req.body);
      this.res
        .status(200)
        .location(`${this.req.baseUrl}/${this.table}/${result.insertId}`)
        .json({
          message: 'Updated successfully',
          ...this.req.body,
        });
    } catch (err) {
      console.error(err);
      this.res.status(500).json({ message: 'Something went wrong' });
    }
  }

  async delete() {
    try {
      await this.model.delete(this.req.params);
      this.res.status(204).json({ message: 'Deleted successfully' });
    } catch (err) {
      console.error(err);
      this.res.status(500).json({ message: 'Something went wrong' });
    }
  }

  sendJson(status, data) {
    this.res.status(status).json(data);
  }
}

module.exports = BaseController;
