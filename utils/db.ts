
import { openDatabaseSync, SQLiteDatabase } from 'expo-sqlite';

const db: SQLiteDatabase = openDatabaseSync('caturn.db');

export function initDB() {
  db.execSync(`CREATE TABLE IF NOT EXISTS tipos_material (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    reciclable INTEGER NOT NULL DEFAULT 1,
    tipo_reciclaje TEXT,
    imagen_referencia TEXT
  );`);

  db.execSync(`CREATE TABLE IF NOT EXISTS materiales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    categoria TEXT,
    subcategoria TEXT,
    reciclable INTEGER NOT NULL DEFAULT 1,
    tipo_reciclaje TEXT,
    grado_contaminacion TEXT,
    color TEXT,
    peso_unitario REAL,
    unidades INTEGER DEFAULT 0,
    volumen_unitario REAL,
    ubicacion TEXT,
    estado TEXT,
    codigo_identificacion TEXT,
    imagen_url TEXT,
    probabilidad_clasificacion_ia REAL,
    fecha_ingreso TEXT DEFAULT CURRENT_TIMESTAMP,
    fecha_salida TEXT,
    proveedor_origen TEXT,
    destino TEXT,
    notas TEXT,
    vida_util_estimada TEXT,
    condiciones_almacenamiento TEXT,
    uso_actual TEXT,
    usos_potenciales TEXT,
    compatibilidad_reciclaje TEXT,
    energia_necesaria_reciclaje REAL,
    agua_necesaria_reciclaje REAL,
    costo_estimado_reciclaje REAL,
    impacto_ambiental TEXT,
    composicion TEXT,
    origen_material TEXT,
    prioridad_reuso INTEGER DEFAULT 0,
    responsable_asignado TEXT,
    lote TEXT,
    tipo_material_id INTEGER
    -- FOREIGN KEY (tipo_material_id) REFERENCES tipos_material(id)
  );`);
}


// Insertar un material
export function insertMaterial(material: Omit<any, 'id'>) {
  const keys = Object.keys(material);
  const values = Object.values(material);
  const placeholders = keys.map(() => '?').join(',');
  const sql = `INSERT INTO materiales (${keys.join(',')}) VALUES (${placeholders})`;
  db.runAsync(sql, values);
}

// Listar todos los materiales
export async function getAllMateriales() {
  return await db.getAllAsync<any>(`SELECT * FROM materiales ORDER BY fecha_ingreso DESC`);
}

// Insertar un tipo_material
export function insertTipoMaterial(tipo: Omit<any, 'id'>) {
  const keys = Object.keys(tipo);
  const values = Object.values(tipo);
  const placeholders = keys.map(() => '?').join(',');
  const sql = `INSERT INTO tipos_material (${keys.join(',')}) VALUES (${placeholders})`;
  db.runAsync(sql, values);
}

// Listar todos los tipos_material
export async function getAllTiposMaterial() {
  return await db.getAllAsync<any>(`SELECT * FROM tipos_material ORDER BY nombre ASC`);
}

export default db;
