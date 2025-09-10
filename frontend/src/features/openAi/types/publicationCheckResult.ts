export interface PublicationCheckResult {
  /** 新規情報の包含 */
  newInformation: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** 発信主体と登録企業の関係性 */
  senderRelationship: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** 誤字脱字 */
  typos: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** 誹謗中傷・差別表現 */
  discrimination: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** 法令違反 */
  legalViolations: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** メディア掲載実績 */
  mediaCoverage: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** 商品再販 */
  productResale: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** 調査レポート */
  surveyReport: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** 婚活イベント */
  marriageEvent: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** ビフォー・アフター画像 */
  beforeAfterImages: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** 性的表現画像 */
  sexualContent: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** 医療・美容系業種 */
  medicalBeauty: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** 総合判定 */
  overallResult: {
    status: "PASS" | "FAIL";
    summary: string;
  };
}
