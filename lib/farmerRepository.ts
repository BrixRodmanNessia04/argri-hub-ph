import {
  db,
  createBaseEntity,
  FarmEntity,
  PlotEntity,
  CropCycleEntity,
  FieldActivityEntity,
  HarvestEntity,
  SaleEntity,
  ExpenseEntity,
  InventoryItemEntity,
  InventoryTransactionEntity,
  PestDiseaseEntity,
  LaborLogEntity,
  EquipmentEntity,
  EquipmentLogEntity,
  TaskEntity,
  GeneralLogEntity,
} from "./db";

export async function queueSyncOperation(
  entityType: string,
  entityLocalId: string,
  operation: "CREATE" | "UPDATE" | "DELETE",
  payload: Record<string, unknown>
) {
  try {
    await db.syncQueue.add({
      localId: `sq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      entityType,
      entityLocalId,
      operation,
      payload,
      createdAt: new Date().toISOString(),
      attempts: 0,
    });
  } catch (e) {
    console.warn("Failed to add record to sync queue:", e);
  }
}

export async function undoLastOperation(
  tableName: keyof typeof db & string,
  entityLocalId: string
): Promise<boolean> {
  try {
    // Delete entity from Dexie local table
    const table = (db as any)[tableName];
    if (table) {
      await table.delete(entityLocalId);
    }
    // Remove pending sync queue entry
    await db.syncQueue.where("entityLocalId").equals(entityLocalId).delete();
    return true;
  } catch (e) {
    console.error(`Failed to undo operation for ${entityLocalId}:`, e);
    return false;
  }
}

// ---- FARMS ----
export async function createFarm(data: Omit<FarmEntity, keyof ReturnType<typeof createBaseEntity>>): Promise<FarmEntity> {
  const farm: FarmEntity = {
    ...createBaseEntity(),
    ...data,
  };
  await db.farms.add(farm);
  await queueSyncOperation("farms", farm.localId, "CREATE", farm as unknown as Record<string, unknown>);
  return farm;
}

export async function updateFarm(localId: string, data: Partial<FarmEntity>): Promise<void> {
  const existing = await db.farms.get(localId);
  if (!existing) return;
  const updated: FarmEntity = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
    syncStatus: existing.syncStatus === "synced" ? "pending" : existing.syncStatus,
    version: (existing.version || 1) + 1,
  };
  await db.farms.put(updated);
  await queueSyncOperation("farms", localId, "UPDATE", updated as unknown as Record<string, unknown>);
}

export async function deleteFarm(localId: string): Promise<void> {
  await db.farms.update(localId, { isDeleted: true, syncStatus: "pending" });
  await queueSyncOperation("farms", localId, "DELETE", { localId });
}

// ---- PLOTS ----
export async function createPlot(data: Omit<PlotEntity, keyof ReturnType<typeof createBaseEntity>>): Promise<PlotEntity> {
  const plot: PlotEntity = {
    ...createBaseEntity(),
    ...data,
  };
  await db.plots.add(plot);
  await queueSyncOperation("plots", plot.localId, "CREATE", plot as unknown as Record<string, unknown>);
  return plot;
}

export async function updatePlot(localId: string, data: Partial<PlotEntity>): Promise<void> {
  const existing = await db.plots.get(localId);
  if (!existing) return;
  const updated: PlotEntity = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
    syncStatus: existing.syncStatus === "synced" ? "pending" : existing.syncStatus,
    version: (existing.version || 1) + 1,
  };
  await db.plots.put(updated);
  await queueSyncOperation("plots", localId, "UPDATE", updated as unknown as Record<string, unknown>);
}

export async function deletePlot(localId: string): Promise<void> {
  await db.plots.update(localId, { isDeleted: true, syncStatus: "pending" });
  await queueSyncOperation("plots", localId, "DELETE", { localId });
}

// ---- CROP CYCLES ----
export async function createCropCycle(data: Omit<CropCycleEntity, keyof ReturnType<typeof createBaseEntity>>): Promise<CropCycleEntity> {
  const cycle: CropCycleEntity = {
    ...createBaseEntity(),
    ...data,
  };
  await db.cropCycles.add(cycle);
  await queueSyncOperation("crop_cycles", cycle.localId, "CREATE", cycle as unknown as Record<string, unknown>);
  return cycle;
}

export async function updateCropCycle(localId: string, data: Partial<CropCycleEntity>): Promise<void> {
  const existing = await db.cropCycles.get(localId);
  if (!existing) return;
  const updated: CropCycleEntity = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
    syncStatus: existing.syncStatus === "synced" ? "pending" : existing.syncStatus,
    version: (existing.version || 1) + 1,
  };
  await db.cropCycles.put(updated);
  await queueSyncOperation("crop_cycles", localId, "UPDATE", updated as unknown as Record<string, unknown>);
}

export async function deleteCropCycle(localId: string): Promise<void> {
  await db.cropCycles.update(localId, { isDeleted: true, syncStatus: "pending" });
  await queueSyncOperation("crop_cycles", localId, "DELETE", { localId });
}

// ---- FIELD ACTIVITIES ----
export async function createFieldActivity(data: Omit<FieldActivityEntity, keyof ReturnType<typeof createBaseEntity>>): Promise<FieldActivityEntity> {
  const activity: FieldActivityEntity = {
    ...createBaseEntity(),
    ...data,
  };
  await db.fieldActivities.add(activity);
  await queueSyncOperation("field_activities", activity.localId, "CREATE", activity as unknown as Record<string, unknown>);
  return activity;
}

export async function updateFieldActivity(localId: string, data: Partial<FieldActivityEntity>): Promise<void> {
  const existing = await db.fieldActivities.get(localId);
  if (!existing) return;
  const updated: FieldActivityEntity = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
    syncStatus: existing.syncStatus === "synced" ? "pending" : existing.syncStatus,
    version: (existing.version || 1) + 1,
  };
  await db.fieldActivities.put(updated);
  await queueSyncOperation("field_activities", localId, "UPDATE", updated as unknown as Record<string, unknown>);
}

export async function deleteFieldActivity(localId: string): Promise<void> {
  await db.fieldActivities.update(localId, { isDeleted: true, syncStatus: "pending" });
  await queueSyncOperation("field_activities", localId, "DELETE", { localId });
}

// ---- HARVESTS ----
export async function createHarvest(data: Omit<HarvestEntity, keyof ReturnType<typeof createBaseEntity>>): Promise<HarvestEntity> {
  const harvest: HarvestEntity = {
    ...createBaseEntity(),
    ...data,
  };
  await db.harvests.add(harvest);
  await queueSyncOperation("harvests", harvest.localId, "CREATE", harvest as unknown as Record<string, unknown>);
  return harvest;
}

export async function updateHarvest(localId: string, data: Partial<HarvestEntity>): Promise<void> {
  const existing = await db.harvests.get(localId);
  if (!existing) return;
  const updated: HarvestEntity = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
    syncStatus: existing.syncStatus === "synced" ? "pending" : existing.syncStatus,
    version: (existing.version || 1) + 1,
  };
  await db.harvests.put(updated);
  await queueSyncOperation("harvests", localId, "UPDATE", updated as unknown as Record<string, unknown>);
}

export async function deleteHarvest(localId: string): Promise<void> {
  await db.harvests.update(localId, { isDeleted: true, syncStatus: "pending" });
  await queueSyncOperation("harvests", localId, "DELETE", { localId });
}

// ---- SALES ----
export async function createSale(data: Omit<SaleEntity, keyof ReturnType<typeof createBaseEntity>>): Promise<SaleEntity> {
  const sale: SaleEntity = {
    ...createBaseEntity(),
    ...data,
  };
  await db.sales.add(sale);
  await queueSyncOperation("sales", sale.localId, "CREATE", sale as unknown as Record<string, unknown>);
  return sale;
}

export async function updateSale(localId: string, data: Partial<SaleEntity>): Promise<void> {
  const existing = await db.sales.get(localId);
  if (!existing) return;
  const updated: SaleEntity = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
    syncStatus: existing.syncStatus === "synced" ? "pending" : existing.syncStatus,
    version: (existing.version || 1) + 1,
  };
  await db.sales.put(updated);
  await queueSyncOperation("sales", localId, "UPDATE", updated as unknown as Record<string, unknown>);
}

export async function deleteSale(localId: string): Promise<void> {
  await db.sales.update(localId, { isDeleted: true, syncStatus: "pending" });
  await queueSyncOperation("sales", localId, "DELETE", { localId });
}

// ---- EXPENSES ----
export async function createExpense(data: Omit<ExpenseEntity, keyof ReturnType<typeof createBaseEntity>>): Promise<ExpenseEntity> {
  const expense: ExpenseEntity = {
    ...createBaseEntity(),
    ...data,
  };
  await db.expenses.add(expense);
  await queueSyncOperation("expenses", expense.localId, "CREATE", expense as unknown as Record<string, unknown>);
  return expense;
}

export async function updateExpense(localId: string, data: Partial<ExpenseEntity>): Promise<void> {
  const existing = await db.expenses.get(localId);
  if (!existing) return;
  const updated: ExpenseEntity = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
    syncStatus: existing.syncStatus === "synced" ? "pending" : existing.syncStatus,
    version: (existing.version || 1) + 1,
  };
  await db.expenses.put(updated);
  await queueSyncOperation("expenses", localId, "UPDATE", updated as unknown as Record<string, unknown>);
}

export async function deleteExpense(localId: string): Promise<void> {
  await db.expenses.update(localId, { isDeleted: true, syncStatus: "pending" });
  await queueSyncOperation("expenses", localId, "DELETE", { localId });
}

// ---- PESTS & DISEASES ----
export async function createPestDisease(data: Omit<PestDiseaseEntity, keyof ReturnType<typeof createBaseEntity>>): Promise<PestDiseaseEntity> {
  const item: PestDiseaseEntity = {
    ...createBaseEntity(),
    ...data,
  };
  await db.pestsDiseases.add(item);
  await queueSyncOperation("pests_diseases", item.localId, "CREATE", item as unknown as Record<string, unknown>);
  return item;
}

export async function updatePestDisease(localId: string, data: Partial<PestDiseaseEntity>): Promise<void> {
  const existing = await db.pestsDiseases.get(localId);
  if (!existing) return;
  const updated: PestDiseaseEntity = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
    syncStatus: existing.syncStatus === "synced" ? "pending" : existing.syncStatus,
    version: (existing.version || 1) + 1,
  };
  await db.pestsDiseases.put(updated);
  await queueSyncOperation("pests_diseases", localId, "UPDATE", updated as unknown as Record<string, unknown>);
}

export async function deletePestDisease(localId: string): Promise<void> {
  await db.pestsDiseases.update(localId, { isDeleted: true, syncStatus: "pending" });
  await queueSyncOperation("pests_diseases", localId, "DELETE", { localId });
}

// ---- LABOR LOGS ----
export async function createLaborLog(data: Omit<LaborLogEntity, keyof ReturnType<typeof createBaseEntity>>): Promise<LaborLogEntity> {
  const item: LaborLogEntity = {
    ...createBaseEntity(),
    ...data,
  };
  await db.laborLogs.add(item);
  await queueSyncOperation("labor_logs", item.localId, "CREATE", item as unknown as Record<string, unknown>);
  return item;
}

export async function updateLaborLog(localId: string, data: Partial<LaborLogEntity>): Promise<void> {
  const existing = await db.laborLogs.get(localId);
  if (!existing) return;
  const updated: LaborLogEntity = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
    syncStatus: existing.syncStatus === "synced" ? "pending" : existing.syncStatus,
    version: (existing.version || 1) + 1,
  };
  await db.laborLogs.put(updated);
  await queueSyncOperation("labor_logs", localId, "UPDATE", updated as unknown as Record<string, unknown>);
}

export async function deleteLaborLog(localId: string): Promise<void> {
  await db.laborLogs.update(localId, { isDeleted: true, syncStatus: "pending" });
  await queueSyncOperation("labor_logs", localId, "DELETE", { localId });
}

// ---- EQUIPMENT ----
export async function createEquipment(data: Omit<EquipmentEntity, keyof ReturnType<typeof createBaseEntity>>): Promise<EquipmentEntity> {
  const item: EquipmentEntity = {
    ...createBaseEntity(),
    ...data,
  };
  await db.equipment.add(item);
  await queueSyncOperation("equipment", item.localId, "CREATE", item as unknown as Record<string, unknown>);
  return item;
}

export async function updateEquipment(localId: string, data: Partial<EquipmentEntity>): Promise<void> {
  const existing = await db.equipment.get(localId);
  if (!existing) return;
  const updated: EquipmentEntity = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
    syncStatus: existing.syncStatus === "synced" ? "pending" : existing.syncStatus,
    version: (existing.version || 1) + 1,
  };
  await db.equipment.put(updated);
  await queueSyncOperation("equipment", localId, "UPDATE", updated as unknown as Record<string, unknown>);
}

export async function deleteEquipment(localId: string): Promise<void> {
  await db.equipment.update(localId, { isDeleted: true, syncStatus: "pending" });
  await queueSyncOperation("equipment", localId, "DELETE", { localId });
}

// ---- TASKS ----
export async function createTask(data: Omit<TaskEntity, keyof ReturnType<typeof createBaseEntity>>): Promise<TaskEntity> {
  const item: TaskEntity = {
    ...createBaseEntity(),
    ...data,
  };
  await db.tasks.add(item);
  await queueSyncOperation("tasks", item.localId, "CREATE", item as unknown as Record<string, unknown>);
  return item;
}

export async function updateTask(localId: string, data: Partial<TaskEntity>): Promise<void> {
  const existing = await db.tasks.get(localId);
  if (!existing) return;
  const updated: TaskEntity = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
    syncStatus: existing.syncStatus === "synced" ? "pending" : existing.syncStatus,
    version: (existing.version || 1) + 1,
  };
  await db.tasks.put(updated);
  await queueSyncOperation("tasks", localId, "UPDATE", updated as unknown as Record<string, unknown>);
}

export async function deleteTask(localId: string): Promise<void> {
  await db.tasks.update(localId, { isDeleted: true, syncStatus: "pending" });
  await queueSyncOperation("tasks", localId, "DELETE", { localId });
}

// ---- GENERAL LOGS ----
export async function createGeneralLog(data: Omit<GeneralLogEntity, keyof ReturnType<typeof createBaseEntity>>): Promise<GeneralLogEntity> {
  const item: GeneralLogEntity = {
    ...createBaseEntity(),
    ...data,
  };
  await db.generalLogs.add(item);
  await queueSyncOperation("general_logs", item.localId, "CREATE", item as unknown as Record<string, unknown>);
  return item;
}

export async function updateGeneralLog(localId: string, data: Partial<GeneralLogEntity>): Promise<void> {
  const existing = await db.generalLogs.get(localId);
  if (!existing) return;
  const updated: GeneralLogEntity = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
    syncStatus: existing.syncStatus === "synced" ? "pending" : existing.syncStatus,
    version: (existing.version || 1) + 1,
  };
  await db.generalLogs.put(updated);
  await queueSyncOperation("general_logs", localId, "UPDATE", updated as unknown as Record<string, unknown>);
}

export async function deleteGeneralLog(localId: string): Promise<void> {
  await db.generalLogs.update(localId, { isDeleted: true, syncStatus: "pending" });
  await queueSyncOperation("general_logs", localId, "DELETE", { localId });
}

// ---- UNIFIED LOG ITEM INTERFACE FOR `/farmer/logs` ----
export interface UnifiedLogItem {
  id: string;
  logCategory: "activity" | "expense" | "harvest" | "sale" | "inventory" | "pest" | "labor" | "equipment" | "general";
  title: string;
  typeBadge: string;
  date: string;
  farmId?: string;
  plotId?: string;
  cropCycleId?: string;
  summary: string;
  amountOrQty?: string;
  syncStatus: string;
  editUrl: string;
  viewUrl: string;
  createdAt: string;
}

export async function getUnifiedFarmerLogs(): Promise<UnifiedLogItem[]> {
  const activities = (await db.fieldActivities.toArray()).filter((r) => !r.isDeleted);
  const expenses = (await db.expenses.toArray()).filter((r) => !r.isDeleted);
  const harvests = (await db.harvests.toArray()).filter((r) => !r.isDeleted);
  const sales = (await db.sales.toArray()).filter((r) => !r.isDeleted);
  const inventoryTx = (await db.inventoryTransactions.toArray()).filter((r) => !r.isDeleted);
  const pests = (await db.pestsDiseases.toArray()).filter((r) => !r.isDeleted);
  const labor = (await db.laborLogs.toArray()).filter((r) => !r.isDeleted);
  const equipLogs = (await db.equipmentLogs.toArray()).filter((r) => !r.isDeleted);
  const generalLogs = (await db.generalLogs.toArray()).filter((r) => !r.isDeleted);

  const unified: UnifiedLogItem[] = [];

  activities.forEach((act) => {
    unified.push({
      id: act.localId,
      logCategory: "activity",
      title: act.activityType,
      typeBadge: "Activity",
      date: act.loggedAt,
      farmId: act.farmId,
      plotId: act.plotId,
      cropCycleId: act.cropCycleId,
      summary: act.description,
      amountOrQty: act.cost > 0 ? `₱${act.cost.toLocaleString()}` : undefined,
      syncStatus: act.syncStatus,
      editUrl: `/farmer/activities/${act.localId}/edit`,
      viewUrl: `/farmer/activities/${act.localId}`,
      createdAt: act.createdAt,
    });
  });

  expenses.forEach((exp) => {
    unified.push({
      id: exp.localId,
      logCategory: "expense",
      title: exp.category,
      typeBadge: "Expense",
      date: exp.date,
      farmId: exp.farmId,
      plotId: exp.plotId,
      cropCycleId: exp.cropCycleId,
      summary: exp.description,
      amountOrQty: `-₱${exp.amount.toLocaleString()}`,
      syncStatus: exp.syncStatus,
      editUrl: `/farmer/expenses/${exp.localId}/edit`,
      viewUrl: `/farmer/expenses/${exp.localId}`,
      createdAt: exp.createdAt,
    });
  });

  harvests.forEach((h) => {
    unified.push({
      id: h.localId,
      logCategory: "harvest",
      title: `${h.crop} Harvest`,
      typeBadge: "Harvest",
      date: h.harvestedAt,
      farmId: h.farmId,
      plotId: h.plotId,
      cropCycleId: h.cropCycleId,
      summary: `Grade: ${h.qualityGrade}${h.notes ? ` • ${h.notes}` : ""}`,
      amountOrQty: `${h.weightKg} kg`,
      syncStatus: h.syncStatus,
      editUrl: `/farmer/harvests/${h.localId}/edit`,
      viewUrl: `/farmer/harvests/${h.localId}`,
      createdAt: h.createdAt,
    });
  });

  sales.forEach((s) => {
    unified.push({
      id: s.localId,
      logCategory: "sale",
      title: `Sale to ${s.buyerName}`,
      typeBadge: "Sale",
      date: s.soldAt,
      farmId: s.farmId,
      cropCycleId: s.cropCycleId,
      summary: `${s.weightKg} kg ${s.crop} @ ₱${s.pricePerKg}/kg`,
      amountOrQty: `+₱${s.totalAmount.toLocaleString()}`,
      syncStatus: s.syncStatus,
      editUrl: `/farmer/sales/${s.localId}/edit`,
      viewUrl: `/farmer/sales/${s.localId}`,
      createdAt: s.createdAt,
    });
  });

  inventoryTx.forEach((tx) => {
    unified.push({
      id: tx.localId,
      logCategory: "inventory",
      title: `Stock ${tx.changeType}`,
      typeBadge: "Inventory",
      date: tx.date,
      farmId: tx.farmId,
      cropCycleId: tx.cropCycleId,
      summary: tx.reason,
      amountOrQty: `${tx.quantityKg} kg`,
      syncStatus: tx.syncStatus,
      editUrl: `/farmer/inventory/${tx.inventoryItemId}/edit`,
      viewUrl: `/farmer/inventory/${tx.inventoryItemId}`,
      createdAt: tx.createdAt,
    });
  });

  pests.forEach((p) => {
    unified.push({
      id: p.localId,
      logCategory: "pest",
      title: `${p.observationType}: ${p.name}`,
      typeBadge: "Pest/Disease",
      date: p.observedAt,
      farmId: p.farmId,
      plotId: p.plotId,
      cropCycleId: p.cropCycleId,
      summary: `Severity: ${p.severity} • Symptoms: ${p.symptoms}`,
      amountOrQty: p.status,
      syncStatus: p.syncStatus,
      editUrl: `/farmer/pests-diseases/${p.localId}/edit`,
      viewUrl: `/farmer/pests-diseases/${p.localId}`,
      createdAt: p.createdAt,
    });
  });

  labor.forEach((l) => {
    unified.push({
      id: l.localId,
      logCategory: "labor",
      title: `Labor: ${l.workType}`,
      typeBadge: "Labor",
      date: l.date,
      farmId: l.farmId,
      plotId: l.plotId,
      cropCycleId: l.cropCycleId,
      summary: `${l.workerCount} workers (${l.workerGroup})`,
      amountOrQty: `-₱${l.totalCost.toLocaleString()}`,
      syncStatus: l.syncStatus,
      editUrl: `/farmer/labor/${l.localId}/edit`,
      viewUrl: `/farmer/labor/${l.localId}`,
      createdAt: l.createdAt,
    });
  });

  equipLogs.forEach((eq) => {
    unified.push({
      id: eq.localId,
      logCategory: "equipment",
      title: `Equipment ${eq.logType}`,
      typeBadge: "Equipment",
      date: eq.date,
      farmId: eq.farmId,
      plotId: eq.plotId,
      cropCycleId: eq.cropCycleId,
      summary: eq.activityDescription,
      amountOrQty: eq.cost > 0 ? `-₱${eq.cost.toLocaleString()}` : undefined,
      syncStatus: eq.syncStatus,
      editUrl: `/farmer/equipment/${eq.equipmentId}/edit`,
      viewUrl: `/farmer/equipment/${eq.equipmentId}`,
      createdAt: eq.createdAt,
    });
  });

  generalLogs.forEach((g) => {
    unified.push({
      id: g.localId,
      logCategory: "general",
      title: g.title,
      typeBadge: "General Note",
      date: g.date,
      farmId: g.farmId,
      plotId: g.plotId,
      cropCycleId: g.cropCycleId,
      summary: g.notes,
      amountOrQty: g.cost ? `₱${g.cost.toLocaleString()}` : undefined,
      syncStatus: g.syncStatus,
      editUrl: `/farmer/logs/${g.localId}/edit`,
      viewUrl: `/farmer/logs/${g.localId}`,
      createdAt: g.createdAt,
    });
  });

  return unified.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
