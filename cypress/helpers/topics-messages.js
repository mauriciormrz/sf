const MSG_ORDER_SHIPPED = "OrderShipped";
const TOPIC_ORDER_SHIPPED = process.env.TOPIC_PREFIX + "skava.internal.events.yl-orders-shipped";

const MSG_ORDER_UPDATED = "OrderUpdated";
const TOPIC_ORDER_UPDATED = process.env.TOPIC_PREFIX + "skava.internal.events.yl-orders";

const MSG_SKU_PRICE_CHANGED = "SkuPriceChanged";
const TOPIC_SKU_PRICE_CHANGED = process.env.TOPIC_PREFIX + "skava.internal.events.yl-sku-prices";

const MSG_SKU_UPDATED = "SkuUpdated";
const TOPIC_SKU_UPDATED = process.env.TOPIC_PREFIX + "skava.internal.events.yl-skus";

const MSG_YL_ACCOUNT_CREDIT_BALANCE_UPDATED = "YLAccountCreditBalanceUpdated";
const TOPIC_YL_ACCOUNT_CREDIT_BALANCE_UPDATED = process.env.TOPIC_PREFIX + "skava.internal.events.yl-customer-credit-balances";

const MSG_YL_ACCOUNT_CREDIT_LEDGER = "YLAccountCreditLedger";
const TOPIC_YL_ACCOUNT_CREDIT_LEDGER = process.env.TOPIC_PREFIX + "skava.internal.events.yl-customer-credits-ledger";

const MSG_YL_ACCOUNT_LOYALTY_LEDGER = "YLAccountLoyaltyLedger";
const TOPIC_YL_ACCOUNT_LOYALTY_LEDGER = process.env.TOPIC_PREFIX + "skava.internal.events.yl-customer-loyalty-ledger";

const MSG_YL_ACCOUNT_PAYMENT_ACH = "YLAccountPaymentACH";
const TOPIC_YL_ACCOUNT_PAYMENT_ACH = process.env.TOPIC_PREFIX + "skava.internal.events.yl-payment-ach";


const MSG_YL_ACCOUNT_PAYMENT_CARD = "YLAccountPaymentCard";
const TOPIC_YL_ACCOUNT_PAYMENT_CARD = process.env.TOPIC_PREFIX + "skava.internal.events.yl-payment-credit-cards";

const MSG_YL_ACCOUNT_PAYMENT_PAYPAL = "YLAccountPaymentPayPal";
const TOPIC_YL_ACCOUNT_PAYMENT_PAYPAL = process.env.TOPIC_PREFIX + "skava.internal.events.yl-payment-paypal";

const MSG_YL_ACCOUNT_POINT_VALUE_BALANCE_UPDATED = "YLAccountPointValueBalanceUpdat";
const TOPIC_YL_ACCOUNT_POINT_VALUE_BALANCE_UPDATED = process.env.TOPIC_PREFIX + "skava.internal.events.yl-customer-er-point-balances";

const MSG_YL_ACCOUNT_SUBSCRIPTION = "YLAccountSubscription";
const TOPIC_YL_ACCOUNT_SUBSCRIPTION = process.env.TOPIC_PREFIX + "skava.internal.events.yl-customer-subscriptions";

const MSG_YL_ACCOUNT_UPDATED = "YLAccountUpdated";
const TOPIC_YL_ACCOUNT_UPDATED = process.env.TOPIC_PREFIX + "skava.internal.events.yl-customers";

const MSG_YL_CUSTOMER_ADDRESS_UPDATED = "YLCustomerAddressUpdated";
const TOPIC_YL_CUSTOMER_ADDRESS_UPDATED = process.env.TOPIC_PREFIX + "skava.internal.events.yl-customer-addresses";

const TOPIC_ORDERS_PROCESSED = process.env.TOPIC_PREFIX + "skava.internal.replies.orders";
const MSG_ORDER_PLACED_PROCESSED = "OrderPlacedProcessed";
const MSG_ORDER_REPLACED_PROCESSED = "OrderReplacedProcessed";
const MSG_ORDER_RETURNED_PROCESSED = "OrderReturnedProcessed";


const getMessageInfo = (topic, map) => {

  if (topic.includes(TOPIC_ORDER_SHIPPED)) {
    return { contract: MSG_ORDER_SHIPPED, recordid: map.get('shipmentId') };
  }

  if (topic.includes(TOPIC_ORDER_UPDATED)) {
    return { contract: MSG_ORDER_UPDATED, recordid: map.get('orderId') };
  }

  if (topic.includes(TOPIC_SKU_PRICE_CHANGED)) {
    return { contract: MSG_SKU_PRICE_CHANGED, recordid: map.get('itemPriceId') };
  }

  if (topic.includes(TOPIC_SKU_UPDATED)) {
    return { contract: MSG_SKU_UPDATED, recordid: map.get('partNumber') };
  }

  if (topic.includes(TOPIC_YL_ACCOUNT_CREDIT_BALANCE_UPDATED)) {
    return { contract: MSG_YL_ACCOUNT_CREDIT_BALANCE_UPDATED, recordid: map.get('ylCustomerId') };
  }

  if (topic.includes(TOPIC_YL_ACCOUNT_CREDIT_LEDGER)) {
    return { contract: MSG_YL_ACCOUNT_CREDIT_LEDGER, recordid: map.get('ylCustomerId') };
  }

  if (topic.includes(TOPIC_YL_ACCOUNT_LOYALTY_LEDGER)) {
    return { contract: MSG_YL_ACCOUNT_LOYALTY_LEDGER, recordid: map.get('ledgerItemId') };
  }

  if (topic.includes(TOPIC_YL_ACCOUNT_PAYMENT_ACH)) {
    return { contract: MSG_YL_ACCOUNT_PAYMENT_ACH, recordid: map.get('ylCustomerId') };
  }

  if (topic.includes(TOPIC_YL_ACCOUNT_PAYMENT_CARD)) {
    return { contract: MSG_YL_ACCOUNT_PAYMENT_CARD, recordid: map.get('ylCustomerId') };
  }

  if (topic.includes(TOPIC_YL_ACCOUNT_PAYMENT_PAYPAL)) {
    return { contract: MSG_YL_ACCOUNT_PAYMENT_PAYPAL, recordid: map.get('ylCustomerId') };
  }

  if (topic.includes(TOPIC_YL_ACCOUNT_POINT_VALUE_BALANCE_UPDATED)) {
    return { contract: MSG_YL_ACCOUNT_POINT_VALUE_BALANCE_UPDATED, recordid: map.get('ylCustomerId') };
  }

  if (topic.includes(TOPIC_YL_ACCOUNT_SUBSCRIPTION)) {
    return { contract: MSG_YL_ACCOUNT_SUBSCRIPTION, recordid: map.get('autoshipId') };
  }

  if (topic.includes(TOPIC_YL_ACCOUNT_UPDATED)) {
    return { contract: MSG_YL_ACCOUNT_UPDATED, recordid: map.get('ylCustomerId') };
  }

  if (topic.includes(TOPIC_YL_CUSTOMER_ADDRESS_UPDATED)) {
    return { contract: MSG_YL_CUSTOMER_ADDRESS_UPDATED, recordid: map.get('ylCustomerId') };
  }

  if (topic.includes(TOPIC_ORDERS_PROCESSED)) {

    if (map.get('ReferenceId') === undefined) {
      return { contract: MSG_ORDER_PLACED_PROCESSED, recordid: map.get('YlCustomerId') };
    } else {
      if (map.get('ReferenceId').includes("OrderReplacedProcessed", 0)) {
        return { contract: MSG_ORDER_REPLACED_PROCESSED, recordid: map.get('YlCustomerId') };
      } else {
        return { contract: MSG_ORDER_RETURNED_PROCESSED, recordid: map.get('YlCustomerId') };
      }
    }
  }


  return { contract: 'unknown', recordid: map.get('unknown') };

};

module.exports = {
  getMessageInfo,
  TOPIC_ORDER_SHIPPED,
  TOPIC_ORDER_UPDATED,
  TOPIC_SKU_PRICE_CHANGED,
  TOPIC_SKU_UPDATED,
  TOPIC_YL_ACCOUNT_CREDIT_BALANCE_UPDATED,
  TOPIC_YL_ACCOUNT_CREDIT_LEDGER,
  TOPIC_YL_ACCOUNT_LOYALTY_LEDGER,
  TOPIC_YL_ACCOUNT_PAYMENT_ACH,
  TOPIC_YL_ACCOUNT_PAYMENT_CARD,
  TOPIC_YL_ACCOUNT_PAYMENT_PAYPAL,
  TOPIC_YL_ACCOUNT_POINT_VALUE_BALANCE_UPDATED,
  TOPIC_YL_ACCOUNT_SUBSCRIPTION,
  TOPIC_YL_ACCOUNT_UPDATED,
  TOPIC_YL_CUSTOMER_ADDRESS_UPDATED,
  TOPIC_ORDERS_PROCESSED,
}