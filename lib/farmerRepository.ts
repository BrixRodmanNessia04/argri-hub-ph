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
  InventoryTransactionType,
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
      amountOrQty: (act.cost ?? 0) > 0 ? `₱${(act.cost ?? 0).toLocaleString()}` : undefined,
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
      amountOrQty: `-₱${(exp.amount ?? 0).toLocaleString()}`,
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
      amountOrQty: `+₱${(s.totalAmount ?? 0).toLocaleString()}`,
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
      amountOrQty: `-₱${(l.totalCost ?? 0).toLocaleString()}`,
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
      amountOrQty: (eq.cost ?? 0) > 0 ? `-₱${(eq.cost ?? 0).toLocaleString()}` : undefined,
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
      amountOrQty: g.cost ? `₱${(g.cost ?? 0).toLocaleString()}` : undefined,
      syncStatus: g.syncStatus,
      editUrl: `/farmer/logs/${g.localId}/edit`,
      viewUrl: `/farmer/logs/${g.localId}`,
      createdAt: g.createdAt,
    });
  });

  return unified.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function recordInventoryMovement(params: {
  inventoryItemId: string;
  transactionType: InventoryTransactionType;
  quantityKg: number;
  unit?: string;
  farmId?: string;
  plotId?: string;
  cropCycleId?: string;
  activityLocalId?: string;
  reason: string;
  notes?: string;
  unitCost?: number;
  transactionDate?: string;
  sourceLocation?: string;
  destinationLocation?: string;
  allowNegativeStock?: boolean;
  customIdempotencyKey?: string;
}): Promise<{ transaction: InventoryTransactionEntity; expense?: ExpenseEntity }> {
  const item = await db.inventoryItems.get(params.inventoryItemId);
  if (!item) throw new Error("Inventory stock item not found");

  const txDate = params.transactionDate || new Date().toISOString().split("T")[0];
  const calculatedUnitCost = params.unitCost ?? (item.unitCost || 0);
  const calculatedTotalCost = params.quantityKg * calculatedUnitCost;

  const isDeduction = [
    "usage",
    "sale_out",
    "transfer_out",
    "damage",
    "loss",
    "expired",
    "return_out",
    "correction_decrease",
  ].includes(params.transactionType);

  if (isDeduction) {
    const newQty = item.quantityInKg - params.quantityKg;
    if (newQty < 0 && !params.allowNegativeStock && params.transactionType !== "correction_decrease") {
      throw new Error(`Cannot reduce stock below 0. Available: ${item.quantityInKg} ${item.unit || "kg"}`);
    }
    await db.inventoryItems.update(item.localId, {
      quantityInKg: newQty > 0 ? newQty : 0,
      updatedAt: new Date().toISOString(),
    });
  } else {
    await db.inventoryItems.update(item.localId, {
      quantityInKg: item.quantityInKg + params.quantityKg,
      updatedAt: new Date().toISOString(),
    });
  }

  const txIdempotencyKey = params.customIdempotencyKey || `tx_${params.transactionType}_${item.localId}_${Date.now()}`;

  const transaction: InventoryTransactionEntity = {
    ...createBaseEntity(),
    inventoryItemId: item.localId,
    inventoryItemLocalId: item.localId,
    inventoryItemServerId: item.serverId,
    transactionType: params.transactionType,
    changeType: isDeduction ? "USE" : "ADD",
    quantity: params.quantityKg,
    quantityKg: params.quantityKg,
    unit: params.unit || item.unit || "kg",
    unitCost: calculatedUnitCost,
    totalCost: calculatedTotalCost,
    farmId: params.farmId || item.farmId,
    plotId: params.plotId,
    cropCycleId: params.cropCycleId,
    activityLocalId: params.activityLocalId,
    sourceLocation: params.sourceLocation || item.storageLocation,
    destinationLocation: params.destinationLocation,
    reason: params.reason,
    notes: params.notes,
    date: txDate,
    transactionDate: txDate,
    idempotencyKey: txIdempotencyKey,
  };

  await db.inventoryTransactions.add(transaction);
  await queueSyncOperation("inventory_transactions", transaction.localId, "CREATE", transaction as unknown as Record<string, unknown>);

  let expense: ExpenseEntity | undefined = undefined;

  // AUTOMATIC EXPENSE RECORDING ON USAGE
  if (params.transactionType === "usage") {
    let expCategory: ExpenseEntity["category"] = "OTHER";
    if (item.type === "FERTILIZER") expCategory = "FERTILIZER";
    else if (item.type === "PESTICIDE") expCategory = "PESTICIDE";
    else if (item.type === "HERBICIDE") expCategory = "HERBICIDE";
    else if (item.type === "SEED") expCategory = "SEEDS";
    else if (item.type === "SEEDLING") expCategory = "SEEDLINGS";
    else if (item.type === "COMPOST") expCategory = "COMPOST";
    else if (item.type === "FUEL") expCategory = "FUEL";
    else if (item.type === "PACKAGING") expCategory = "PACKAGING";

    const expenseAmount = calculatedTotalCost > 0 ? calculatedTotalCost : params.quantityKg * 40;

    expense = {
      ...createBaseEntity(),
      farmId: params.farmId || item.farmId,
      plotId: params.plotId,
      cropCycleId: params.cropCycleId,
      category: expCategory,
      description: `Used ${params.quantityKg}${params.unit || item.unit || "kg"} ${item.crop} (${params.reason})`,
      amount: expenseAmount,
      quantity: params.quantityKg,
      unitPrice: calculatedUnitCost > 0 ? calculatedUnitCost : 40,
      unit: params.unit || item.unit || "kg",
      date: txDate,
      notes: `Auto-recorded from Warehouse Stock Usage (${params.transactionType})`,
    };

    await db.expenses.add(expense);
    await queueSyncOperation("expenses", expense.localId, "CREATE", expense as unknown as Record<string, unknown>);

    await db.inventoryTransactions.update(transaction.localId, {
      expenseLocalId: expense.localId,
    });
  }

  return { transaction, expense };
}

export async function getAvailableInventoryItems(params?: {
  userId?: string;
  farmLocalId?: string;
  storageLocation?: string;
  allowedCategories?: string[];
  includeZeroStock?: boolean;
}): Promise<InventoryItemEntity[]> {
  let items = await db.inventoryItems.filter((i) => !i.isDeleted).toArray();

  if (params?.farmLocalId) {
    items = items.filter((i) => !i.farmId || i.farmId === params.farmLocalId);
  }

  if (params?.storageLocation) {
    items = items.filter((i) => i.storageLocation === params.storageLocation);
  }

  if (!params?.includeZeroStock) {
    items = items.filter((i) => (i.quantityInKg || 0) > 0);
  }

  if (params?.allowedCategories && params.allowedCategories.length > 0) {
    const catsUpper = params.allowedCategories.map((c) => c.toUpperCase());
    items = items.filter((i) => catsUpper.includes(i.type.toUpperCase()));
  }

  return items;
}

// ---- NORMALIZED DASHBOARD LEDGER TRANSACTIONS ----

export type LedgerTransactionType =
  | "SALE"
  | "EXPENSE"
  | "INVENTORY_USAGE"
  | "LABOR"
  | "EQUIPMENT"
  | "OTHER_INCOME"
  | "OTHER_COST";

export interface DashboardLedgerTransaction {
  id: string;
  type: LedgerTransactionType;
  label: string;
  amount: number;
  transactionDate: string;
  relatedRoute?: string | null;
  syncStatus?: string | null;
}

export function normalizeSaleToTransaction(sale: SaleEntity): DashboardLedgerTransaction {
  const amount = Number(
    sale.totalAmount ?? sale.grossAmount ?? (sale.weightKg && sale.pricePerKg ? sale.weightKg * sale.pricePerKg : 0)
  ) || 0;

  return {
    id: sale.localId,
    type: "SALE",
    label: `Sold ${sale.weightKg || 0}kg ${sale.crop || "Produce"}`,
    amount,
    transactionDate: sale.soldAt || sale.createdAt || new Date().toISOString().split("T")[0],
    relatedRoute: `/farmer/sales/${sale.localId}`,
    syncStatus: sale.syncStatus,
  };
}

export function normalizeExpenseToTransaction(expense: ExpenseEntity): DashboardLedgerTransaction {
  const amount = Number(expense.amount) || 0;

  return {
    id: expense.localId,
    type: "EXPENSE",
    label: expense.description || `${expense.category} Expense`,
    amount,
    transactionDate: expense.date || expense.createdAt || new Date().toISOString().split("T")[0],
    relatedRoute: `/farmer/expenses/${expense.localId}`,
    syncStatus: expense.syncStatus,
  };
}

export function normalizeLaborToTransaction(labor: LaborLogEntity): DashboardLedgerTransaction {
  const amount = Number(labor.totalCost) || 0;

  return {
    id: labor.localId,
    type: "LABOR",
    label: `Labor: ${labor.workerGroup || labor.workType || "Farm Worker"}`,
    amount,
    transactionDate: labor.date || labor.createdAt || new Date().toISOString().split("T")[0],
    relatedRoute: `/farmer/labor`,
    syncStatus: labor.syncStatus,
  };
}

export function normalizeInventoryUsageToTransaction(tx: InventoryTransactionEntity, itemName?: string): DashboardLedgerTransaction {
  const amount = Number(tx.totalCost ?? (tx.quantityKg && tx.unitCost ? tx.quantityKg * tx.unitCost : 0)) || 0;

  return {
    id: tx.localId,
    type: "INVENTORY_USAGE",
    label: `Usage: ${itemName || "Inventory Item"} (${tx.quantityKg || 0} kg)`,
    amount,
    transactionDate: tx.date || tx.createdAt || new Date().toISOString().split("T")[0],
    relatedRoute: `/farmer/inventory`,
    syncStatus: tx.syncStatus,
  };
}

