/**
 * @deprecated
 */
export enum IRMUserRole {
  /*[Description("Администратор")]*/ Administrator = 1,
  /*[Description("Горячая Линия")]*/ HotLine = 2,
  /*[Description("Call-центр")]*/ CallCenter = 4,
  /*[Description("Сервисная компания")]*/ ServiceCompany = 8,
  /*[Description("Магазин")]*/ Store = 16,
  /*[Description("Центральный офис")]*/ CentralOffice = 32,
  /*[Description("Старший менеджер")]*/ SeniorManager = 64,
  /*[Description("Тех. поддержка")]*/ Support = 128,
  /*[Description("Клиент API CRM")]*/ ApiClient_CRM = 256,
  /*[Description("Call-центр с резервом квот")]*/ CallCenterWithQuotaReserve = 512,
  /*[Description("Клиент API IRM-Master")]*/ ApiClient_IRM_Master = 1024,
  /*[Description("Клиент API Quotas")]*/ ApiClient_Quotas = 2048,
  /*[Description("Сервисная компания с резервом квот")]*/ ServiceCompanyWithQuotaReserve = 4096,
  /*[Description("Группа разбора")]*/ InvestigationGroup = 8192,
  /*[Description("Клиент API IRM-Incidents")]*/ ApiClient_IRM_Incidents = 16384,
  /*[Description("Клиент API IRM-InstallationQueue")]*/ ApiClient_IRM_InstallationQueue = 32768,
  /*[Description("Утилизатор")]*/ Recyclicng_Recycler = 65536,
  /*[Description("Магазин утилизации")]*/ Recyclicng_Store = 131072,
  /*[Description("Менеджер утилизации")]*/ Recycling_Manager = 262144,
  /*[Description("Call-центр утилизации")]*/ Recycling_CallCenter =  524288
}
