import Dexie, { type EntityTable } from 'dexie';

export interface DemoRecord {
  id?: number;
  localId: string;
  role: string;
  title: string;
  details: string;
  metric: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface DemoFarm {
  localId: string;
  name: string;
  location: string;
  areaHectares: number;
  primaryCrop: string;
}

export interface DemoHarvest {
  localId: string;
  crop: string;
  weightKg: number;
  qualityGrade: string;
  harvestedAt: string;
}

export interface DemoCatch {
  localId: string;
  vesselName: string;
  speciesName: string;
  weightKg: number;
  preservationMethod: string;
  caughtAtDate: string;
}

const demoDb = new Dexie('agrihub-demo') as Dexie & {
  demoRecords: EntityTable<DemoRecord, 'localId'>;
  demoFarms: EntityTable<DemoFarm, 'localId'>;
  demoHarvests: EntityTable<DemoHarvest, 'localId'>;
  demoCatches: EntityTable<DemoCatch, 'localId'>;
};

demoDb.version(1).stores({
  demoRecords: 'localId, role, category, createdAt',
  demoFarms: 'localId, name, primaryCrop',
  demoHarvests: 'localId, crop, harvestedAt',
  demoCatches: 'localId, vesselName, speciesName, caughtAtDate',
});

export async function seedDemoDatabase() {
  const count = await demoDb.demoFarms.count();
  if (count > 0) return;

  await demoDb.demoFarms.bulkAdd([
    { localId: 'demo-farm-1', name: 'Atok Strawberry & Cabbage Farm', location: 'Atok, Benguet', areaHectares: 2.5, primaryCrop: 'Benguet Cabbage' },
    { localId: 'demo-farm-2', name: 'La Trinidad Highland Valley Plot', location: 'La Trinidad, Benguet', areaHectares: 1.8, primaryCrop: 'Carrots' },
  ]);

  await demoDb.demoHarvests.bulkAdd([
    { localId: 'demo-h-1', crop: 'Benguet Highland Cabbage', weightKg: 850, qualityGrade: 'Class A', harvestedAt: new Date().toISOString().split('T')[0] },
    { localId: 'demo-h-2', crop: 'Atok Sweet Carrots', weightKg: 620, qualityGrade: 'Class A', harvestedAt: new Date().toISOString().split('T')[0] },
  ]);

  await demoDb.demoCatches.bulkAdd([
    { localId: 'demo-c-1', vesselName: 'FB San Jose Marine Vessel', speciesName: 'Yellowfin Tuna (Tambakol)', weightKg: 450, preservationMethod: 'Chilled Ice', caughtAtDate: new Date().toISOString().split('T')[0] },
    { localId: 'demo-c-2', vesselName: 'FB San Jose Marine Vessel', speciesName: 'Round Scad (Galunggong)', weightKg: 320, preservationMethod: 'Chilled Ice', caughtAtDate: new Date().toISOString().split('T')[0] },
  ]);
}

export async function resetDemoDatabase() {
  await demoDb.demoRecords.clear();
  await demoDb.demoFarms.clear();
  await demoDb.demoHarvests.clear();
  await demoDb.demoCatches.clear();
  await seedDemoDatabase();
}

export { demoDb };
