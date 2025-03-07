import { RefundRuleFactory } from "./refund_rule_factory";
import { FullRefund } from "./full_refund";
import { PartialRefund } from "./partial_refund";
import { NoRefund } from "./no_refund copy";

describe("RefundRuleFactory", () => {
  it("deve retornar FullRefund quando a reserva for cancelada com mais de 7 dias de antecedência", () => {
    const daysUntilCheckIn = 8;
    const refundRule = RefundRuleFactory.getRefundRule(daysUntilCheckIn);
    expect(refundRule).toBeInstanceOf(FullRefund);
  });

  it("deve retornar PartialRefund quando a reserva for cancelada entre 1 e 7 dias de antecedência", () => {
    const daysUntilCheckIn = 5;
    const refundRule = RefundRuleFactory.getRefundRule(daysUntilCheckIn);
    expect(refundRule).toBeInstanceOf(PartialRefund);

    const edgeCaseDay = 1;
    const edgeCaseRule = RefundRuleFactory.getRefundRule(edgeCaseDay);
    expect(edgeCaseRule).toBeInstanceOf(PartialRefund);
  });

  it("deve retornar NoRefund quando a reserva for cancelada com menos de 1 dia de antecedência", () => {
    const daysUntilCheckIn = 0;
    const refundRule = RefundRuleFactory.getRefundRule(daysUntilCheckIn);
    expect(refundRule).toBeInstanceOf(NoRefund);
  });
});