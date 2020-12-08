const pool = require('../utils/pool');

module.exports = class Bike {
  id;
  make;
  model;
  specialization;

  constructor(row) {
    this.id = row.id;
    this.make = row.make;
    this.model = row.model;
    this.specialization = row.specialization;
  }

  static async insert({ make, model, specialization }) {
    const { rows } = await pool.query(
      'INSERT INTO bikes (make, model, specialization) VALUES ($1, $2, $3) RETURNING *', [make, model, specialization]
    );
    return new Bike(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query('SELECT * FROM bikes');

    return rows.map(row => new Bike(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM bikes WHERE id=$1', [id]
    );

    if(!rows[0]) throw new Error(`No bike with id ${id}`);
    return new Bike(rows[0]);
  }

  static async update(id, { make, model, specialization }) {
    const { rows } = await pool.query(
      `UPDATE bikes
        SET make=$1,
            model=$2,
            specialization=$3
        WHERE id=$4
        RETURNING *`,
      [make, model, specialization, id]
    );

    if(!rows[0]) throw new Error(`No bike with id ${id}`);
    return new Bike(rows[0]);
  }
  
  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM bikes WHERE id=$1 RETURNING *', [id]);

    if(!rows[0]) throw new Error(`No bike with id ${id}`);
    return new Bike(rows[0]);
  }
};
