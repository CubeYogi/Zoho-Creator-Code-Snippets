/**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
WHAT IS THIS SCRIPT FOR?
------------------------
Inserting Zoho Creator subform records through Deluge script.**
Why so much talk about this? Well, this question has been asked in 2013 in Zoho Forum but no answer yet, with about 40 people asking the same feature.
https://help.zoho.com/portal/community/topic/how-to-add-row-to-subform-via-script
So we are here to offer a solution to this. Here's an example of how to achieve this.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	Example: Let's consider an Order Form, for making entries into an order 
	Step 1: Order Form has to make one order has allow to enter multiple products records which is from the 'Product' Form
		  Step 2: So In 'Order Form' has the Subform for 'Product Form' which is allow to enter multiple product records for one order
		  Step 3: In such case to insert the product records for the single order througth the deluge script
		  Step 4: Add lookup field in 'Product Form' which is from the 'Order Form' unique id
		  Step 5: Insert the Order form with field values except the 'Product Form' records and get the 'Order Form' unique ID
		  Step 6: Using the Order Form unique ID to insert the 'Product Form' records to 'Product Form'
		  Step 7: Fetch records in 'Product Form' with the Order Form unique id to get the 'Product Form' collection records
		  Step 8. Now Update the 'Order Form's Product subform field to collection records of the 'Product Form' 
*/

/** Deluge script for Order Entry **/
/**
	Step 1: Insert the Order form with field values except the 'Product Form' records and get the 'Order Form' unique ID

**/

order_unique_id = insert into order_form
[

order_id = input.order_id_val
customer_id = input.customer_id_val
order_date = input.order_date_val
total_price = input.total_price_val
order_status = input.order_status_val
delivery_address = input.delivery_address_val
order_notes = input.order_notes_val
];

/**
Assume you have the list of product records, which is for the order 
**/
/**
	Step 2: Using the Order Form unique ID to insert the 'Product Form' records to 'Product Form'
**/
if(order_unique_id != null)
{
	for each product_record_val in product_records
	{
		product_unique_id = insert into product_form
		[
			order_form_lookup_field_id = order_unique_id
			product_name = product_record_val.product_name_val
			quantity = product_record_val.qty_val
			price = product_record_val.price_val

		];
	}

	/** Now update the product subform value to order form **/

	/**
		Step 3: Fetch records in 'Product Form' with the Order Form unique id to get the 'Product Form' collection records
	**/
		  
	product_subform_records = product_form[order_form_lookup_field_id == order_unique_id];
	/**
		Step 4. Now Update the 'Order Form's Product subform field to collection records of the 'Product Form' 
	**/
	order_form_record = order_form[ID == order_unique_id];
	order_form_record.product_subform_field = product_subform_records;
}
