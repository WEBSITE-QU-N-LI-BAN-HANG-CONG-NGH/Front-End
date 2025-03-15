import { Text, Heading, BreadcrumbLink, Breadcrumb, BreadcrumbItem } from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import FaqGroup4081 from "./FaqGroup4081";
import Link from "next/link";
import React from "react";

export default function FAQPage() {
  return (
    <div className="w-full bg-white-a700">
      <Header />
      <div className="mt-5 flex flex-col items-center gap-[74px] lg:gap-[74px] md:gap-[55px] sm:gap-[37px]">
        <div className="container-xs lg:px-5 md:px-5">
          <div className="flex items-start gap-[30px] md:flex-col">
            <div className="flex flex-1 flex-col items-start gap-5 self-center md:self-stretch">
              <Breadcrumb
                separator={<Text className="h-[18px] w-[2.8px] text-[12px] font-light !text-colors">›</Text>}
                className="flex flex-wrap gap-[26px] self-stretch"
              >
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" as={Link}>
                    <Text as="p" className="text-[12px] font-light !text-gray-500">
                      Home
                    </Text>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href="#" as={Link}>
                    <Text as="p" className="text-[12px] font-light !text-gray-500">
                      Login
                    </Text>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              <Heading
                size="heading7xl"
                as="h1"
                className="text-[32px] font-semibold lg:text-[27px] md:text-[26px] sm:text-[24px]"
              >
                Shop Terms & Conditions
              </Heading>
              <Heading size="heading6xl" as="h2" className="text-[24px] font-semibold lg:text-[20px]">
                GENERAL TERMS AND CONDITIONS FOR SALE OF PRODUCTS AND SERVICES
              </Heading>
              <Text size="text3xl" as="p" className="w-full text-[16px] font-light leading-[26px] lg:text-[13px]">
                <span className="font-semibold">
                  <>
                    Definitions & Interpretation
                    <br />
                  </>
                </span>
                <span>
                  <>
                    <br />
                    In the following Terms and Conditions of sale, unless the context requires otherwise
                    <br />
                    <br />
                    (a) &quot;Shop&quot; means Shop Pty Ltd ABN 11 222 333 444;
                    <br />
                    (b) &quot;Customer&quot; means the person or corporation placing an order for the purchase of goods
                    or services from Shop;
                    <br />
                    (c) &quot;Products&quot; means any goods, materials, equipment or services provided to the Customer
                    by Shop;
                    <br />
                    (d) if the Customer comprises more than one person, each of those person’s liability is joint and
                    several;
                    <br />
                    (e) references to a party or a person includes any form of entity and their respective successors,
                    assigns and representatives; <br />
                    (f) for all periods and times specified in clauses 5 and 11, time is of the essence; and
                    <br />
                    (g) all references to currency are references to Australian dollars. <br />
                    <br />
                  </>
                </span>
                <span className="font-semibold">
                  <>
                    General
                    <br />
                  </>
                </span>
                <span>
                  <>
                    <br />
                    By ordering the Products and/or accepting delivery of the Products from Shop, the Customer agrees
                    that it is bound by these Terms and Conditions of sale. Customer orders, including orders placed via
                    the internet, are subject to acceptance by Shop. The acceptance of the Customer&#39;s order by Shop
                    is expressly made conditional upon the Customer&#39;s assent to these Terms and Conditions which
                    will prevail notwithstanding anything that may be stated to the contrary on the Customer&#39;s
                    order. Shop reserves the right to vary any of these terms at any time and any subsequent orders
                    placed by the Customer will constitute an acceptance of the terms as varied. Once a Customer order
                    has been placed and accepted by Shop, the Customer agrees that the Customer has no right to cancel
                    or vary the order at any time, unless agreed upon in writing by both parties.
                    <br />
                    <br />
                  </>
                </span>
                <span className="font-semibold">
                  <>
                    Quotations
                    <br />
                  </>
                </span>
                <span>
                  <>
                    <br />
                    Any quotation by Shop to the Customer will be open for acceptance by the Customer within the period
                    stated in the quotation or, where no period is stated, within seven (7) days from the date of the
                    quotation. Thereafter, prices stated in the quotation may be varied by Shop without notice to the
                    Customer.
                    <br />
                    <br />
                  </>
                </span>
                <span className="font-semibold">
                  <>
                    Prices / Taxes
                    <br />
                  </>
                </span>
                <span>
                  <>
                    <br />
                    The prices charged by and payable to Shop will be the ruling prices applicable at the time of order
                    placement, provided that the Products are accepted for delivery within a reasonable time. Prices are
                    subject to change without notice. Recommended retail prices are provided for indicative purposes
                    only and there is no obligation for Shop to comply with that recommendation. It as agreed that
                    should the Customer fail for any reason to acquire the quantity of Products sold then without
                    limiting Shop&#39; other rights and remedies the unit price charged for the goods sold may be
                    amended to take into account any variation in the total quantity purchased by the Customer. Prices
                    include GST, but do not include any other tax or duty, which is in addition to the price and is to
                    be paid by the Customer at the time of payment for the Products.
                    <br />
                    <br />
                  </>
                </span>
                <span className="font-semibold">
                  <>
                    Terms of Payment
                    <br />
                  </>
                </span>
                <span>
                  <>
                    <br />
                    Credit Card Payments may attract a surcharge, and Shop will inform the Customer if this is to be the
                    case before processing the transaction.
                    <br />
                    <br />
                    Unless otherwise agreed in writing by Shop, where Shop has not agreed in writing to provide
                    commercial credit to the Customer, the total purchase price for Products supplied will be due for
                    payment in cash prior to delivery.
                    <br />
                    <br />
                    Where Shop has agreed in writing to provide commercial credit to the Customer, the Customer must
                    make payments in accordance with the payment terms provided by Shop.
                    <br />
                    <br />
                    Where Shop has approved the provision of a commercial credit arrangement with the Customer but has
                    not provided notice of the payment terms to the Customer, the Customer must pay the total purchase
                    price for Products supplied within seven days of the statement date.
                    <br />
                    <br />
                    Credit Card Payment at an Invoice or transaction level may also be offered to the Customer as a
                    stand-alone payment method, or in conjunction with Credit Card Direct Debit Authorisation.
                    <br />
                    <br />
                  </>
                </span>
                <span className="font-semibold">
                  <>
                    Credit Accounts
                    <br />
                  </>
                </span>
                <span>
                  <>
                    <br />
                    Any commercial credit arrangements that are provided to the Customer by Shop will continue until
                    terminated by Shop at it sole discretion. In the event that Shop terminates the Customer&#39;s
                    commercial credit arrangement, the Customer will be notified in writing and termination will take
                    effect upon receipt of that notification by the Customer.
                    <br /> <br />
                  </>
                </span>
                <span className="font-semibold">
                  <>
                    Change of Ownership
                    <br />
                  </>
                </span>
                <span>
                  <>
                    <br />
                    Trading accounts are approved by Shop based on the information supplied and the representations made
                    by the Customer. In the event that there is a change in ownership of the Customer, whether total or
                    partial, the Customer must immediately provide written notice to Shop informing Shop of these
                    changes. Until Shop receives written notice from the Customer of a change in ownership, the Customer
                    (including where it is a company or trustee, each of the Directors thereof) holds Shop indemnified
                    against any and all losses, unpaid accounts, interest, damages, costs, charges, fees and expenses
                    incurred or suffered by Shop in trading with any person, company (including the same company but
                    with a different shareholder or shareholders) or other entity (including a trust) which may have
                    purchased the Customer&#39;s business or any interest in the Customer&#39;s business or any of the
                    shares in the Customer and used the Customer&#39;s previously approved account for trading.
                    <br />
                    <br />
                    Where a Customer has been authorised by Shop to make payments through Credit Card Direct Debit, the
                    Customer must provide notice in writing at least five (5) days prior to any change in ownership of
                    the business to allow Shop sufficient time to contact the new owner to obtain and confirm new Credit
                    Card information if applicable.
                    <br /> <br />
                  </>
                </span>
                <span className="font-semibold">
                  <>
                    Information on the Products supplied
                    <br />
                  </>
                </span>
                <span>
                  <>
                    <br />
                    All descriptive specifications, illustrations, drawings, data, dimensions and weights furnished by
                    Shop or otherwise contained in catalogues or other advertising material are approximate only and are
                    intended to be merely a general description of the goods, are not incorporated within this agreement
                    and no not form part of the description of the goods sold under this or any other agreement unless
                    otherwise agreed to in writing by Shop in which case such information will be subject to recognised
                    trade tolerances.
                    <br /> <br />
                  </>
                </span>
                <span className="font-semibold">
                  <>
                    Delivery
                    <br />
                    <br />
                    The means of delivering the Products to the Customer will be at Shop&#39; discretion. Shop reserves
                    the right to deliver Products in part deliveries. In the event that Shop incurs additional costs for
                    meeting special (i.e. Tasmania / Northern Territory Deliveries) or urgent delivery arrangements,
                    these additional costs may be charged to the Customer and may include the cost of airfreight where
                    it is not the normal method of delivery. The Customer agrees to accept delivery of the Products sold
                    at any time during normal business hours.
                    <br />
                    <br />
                    Shop will not be liable for any loss or damage resulting from any late delivery of the Products and
                    late delivery will not entitle the Customer to rescind or repudiate the Customer&#39;s order for the
                    Products.
                  </>
                </span>
              </Text>
            </div>
            <div className="mt-[110px] flex w-[24%] flex-col items-start justify-center gap-2 bg-color___1 px-6 py-5 md:w-full sm:px-4">
              <Heading as="h3" className="text-[14px] font-semibold">
                Definitions & Interpretation
              </Heading>
              <div className="flex flex-col items-start gap-2.5 self-stretch">
                <Text size="textxl" as="p" className="text-[14px] font-normal">
                  General
                </Text>
                <Text size="textxl" as="p" className="text-[14px] font-normal">
                  Quotations
                </Text>
                <Text size="textxl" as="p" className="text-[14px] font-normal">
                  Prices / Taxes
                </Text>
                <Text size="textxl" as="p" className="text-[14px] font-normal">
                  Terms of Payment
                </Text>
                <Text size="textxl" as="p" className="text-[14px] font-normal">
                  Credit Accounts
                </Text>
                <Text size="textxl" as="p" className="text-[14px] font-normal">
                  Change of Ownership
                </Text>
                <Text size="textxl" as="p" className="text-[14px] font-normal">
                  Information on the Products supplied
                </Text>
                <Text size="textxl" as="p" className="text-[14px] font-normal">
                  Delivery
                </Text>
              </div>
            </div>
          </div>
        </div>
        <FaqGroup4081 />
      </div>
      <Footer />
    </div>
  );
}
