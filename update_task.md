Here is the task written clearly and professionally:

---

### Checkout & Order Flow Enhancement Task – Rich Super Website

After the user selects all products and proceeds to checkout, implement a checkout page with the following fields and order flow.

### 1. Customer Information Section

Add the following fields:

* Full Name
* Phone Number
* Address

### 2. Order Type Selection

Provide two order options:

#### A. Pickup Option

Users can select **Pickup** with date and time scheduling.

Pickup rules:

* Pickup orders can only be scheduled **after a minimum 5-hour preparation time**.
* Shop operating hours are **until 8:00 PM**.
* If the selected time + 5 hours exceeds closing time, the pickup must automatically move to the **next available day**.
* Example:

  * Order at **12:00 PM → Pickup available after 5:00 PM**
  * Order at **7:00 PM → Pickup available next day** (because store closes at 8 PM)

Pickup scheduling UI:

* Date selector
* Time range selector (2-hour slot format)
  Example:

  * 12:30 PM – 2:30 PM
  * 3:30 PM – 5:30 PM

This means the customer selects a preferred pickup window.

---

#### B. Delivery Option

Users can select **Delivery** with delivery restrictions.

Delivery rules:

* Delivery available only within a **6 km radius (Valley area / defined delivery zone)**.
* Customer must provide:

  * Full Address
  * Postal Code
  * Landmark
  * Any additional delivery details

Delivery scheduling:

* Date selector only
* **No time selector required** for delivery.

---

### 3. Order Confirmation & QR Flow

Keep the existing **QR generator** and **WhatsApp ordering system**, but update the process as follows:

1. User completes checkout details
2. User clicks **Order Confirmation** button
3. System generates the **payment/order QR code**
4. Show message asking customer to **take a screenshot of the QR**
5. Display **OK button** after QR generation
6. Once user clicks **OK**, the system sends the **order details to WhatsApp**.

This ensures customers confirm and save the QR before the WhatsApp order is submitted.

---

The final checkout flow should be:

**Cart → Checkout Details → Pickup/Delivery Selection → Order Confirmation → QR Generation → Screenshot Reminder → OK → WhatsApp Order Submission**.


new update v2 
==================================
Updated task wording:

### Checkout Pickup/Delivery Logic Update

Add logic to get the **current date and current time** when the user enters checkout.

### Pickup Option Logic

For pickup orders:

* Minimum pickup preparation time must be **5 hours from the current time**.
* If the user selects **today’s date**, disable all time slots that are less than 5 hours from the current time.
* Example:

  * Current time: **10:00 AM**
  * Earliest pickup time: **3:00 PM**
  * Any pickup slot before 3:00 PM must not be selectable.
* If no valid pickup slots are available today, automatically allow pickup from the **next day**.
* Shop closes at **8:00 PM**, so pickup slots after 8:00 PM should not be available.

Pickup fields:

* Pickup date
* Pickup time slot

### Delivery Option Update

For delivery orders, collect only these details:

* Address
* Nearest landmark
* Additional details
* Delivery date

No postal code and no delivery time selector needed.

### Final Flow

Cart → Checkout → Select Pickup or Delivery → Validate Date/Time → Order Confirmation → Generate QR → Ask user to screenshot QR → OK → Send order to WhatsApp.
