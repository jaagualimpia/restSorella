/* Proveedor
id	1		NO	int
type	2	'np'	NO	enum
identification	3	''	NO	varchar
businessName	4	''	NO	varchar
providerEmail	5	''	NO	varchar
verificationCode	6	''	NO	varchar
verifiedAccount	7	0	NO	tinyint
societyType	8	''	NO	varchar
legalRepresentative	9	''	NO	varchar
documentType	10	''	NO	varchar
document	11	''	NO	varchar
emailCompany	12	''	NO	varchar
addressCompany	13	''	NO	varchar
telephoneCompany	14	''	NO	varchar
acceptTerms	15	0	NO	tinyint
step	16	1	NO	int
minComission	17	0	NO	int
maxComission	18	0	NO	int
key	19	''	NO	varchar
frequencieProviderDate	20	NULL	YES	date
cityId	21	NULL	YES	int
systemPaymentFrequencieId	22	NULL	YES	int
optionsStatus	23	'active'	NO	enum
optionsCreatedat	24	current_timestamp(6)	NO	datetime
optionsUpdatedat	25	current_timestamp(6)	NO	datetime
qualification	26	0	NO	double
dispatchCityId	27	NULL	YES	int
addiId	28	''	NO	varchar
epaycoId	29	''	NO	varchar
attemptsLogin	30	0	NO	int
*/

/*Marca
id	1		NO	int	10	0	
brand	2	''	NO	varchar			
image	3	''	NO	varchar			
optionsStatus	4	'active'	NO	enum			
optionsCreatedat	5	current_timestamp(6)	NO	datetime			
optionsUpdatedat	6	current_timestamp(6)	NO	datetime			
status	7	'created'	NO	enum			
*/

/*Proveedor/Marca
id	1		NO	int	10	0	
commission	2	0	NO	int	10	0	
brandId	3	NULL	YES	int	10	0	
providerId	4	NULL	YES	int	10	0	
optionsStatus	5	'active'	NO	enum			
optionsCreatedat	6	current_timestamp(6)	NO	datetime			
optionsUpdatedat	7	current_timestamp(6)	NO	datetime			
webSite	8	0	NO	tinyint	3	0	
webSales	9	0	NO	tinyint	3	0	
platformOnline	10	''	NO	text			
percentSalesOnline	11	''	NO	text			
minPriceRange	12	''	NO	varchar			
maxPriceRange	13	''	NO	varchar			
numberOfArticles	14	''	NO	varchar			
businessType	15	'other'	NO	enum			
prerequisites	16	''	NO	varchar			
*/

/*BrandProviderProduct
id	1		NO	int	10	0	
sku	2	''	NO	varchar			
product	3	''	NO	varchar			
characteristics	4	''	NO	text			
linkVideo	5	''	NO	varchar			
conditions	6	''	NO	text			
featured	7	0	NO	tinyint	3	0	Campo que indica si el producto es destacado
brandProviderId	8		NO	int	10	0	
subcategoryId	9		NO	int	10	0	
warrantyId	10		NO	int	10	0	
optionsStatus	11	'active'	NO	enum			
optionsCreatedat	12	current_timestamp(6)	NO	datetime			
optionsUpdatedat	13	current_timestamp(6)	NO	datetime			
long	14	0	NO	double	22		Largo del producto
high	15	0	NO	double	22		Alto del producto
wide	16	0	NO	double	22		Ancho del producto
weight	17	0	NO	double	22		Peso del producto
volume	18	0	NO	double	22		Volumen del producto
applyDevolution	19	'notApply'	NO	enum			Aplica o no devolución
service	20	0	NO	tinyint	3	0	Campo que indica si es un producto o servicio
*/

/*BrandProviderReference
id	1		NO	int	10	0	
sku	2	''	NO	varchar			
reference	3	''	NO	varchar			
price	4	0	NO	double	22		
iva	5	0	NO	double	22		
qty	6	0	NO	int	10	0	
color	7	''	NO	varchar			Color de una referencia si esta aplica
qualification	8	0	NO	double	22		
brandProviderProductId	9		NO	int	10	0	
optionsStatus	10	'active'	NO	enum			
optionsCreatedat	11	current_timestamp(6)	NO	datetime			
optionsUpdatedat	12	current_timestamp(6)	NO	datetime			
size	13	''	NO	varchar			Talla de una referencia si esta aplica
*/

/*BrandProviderMultimedia
id	1		NO	int	10	0	
url	2	''	NO	text			
type	3	'image'	NO	enum			
brandProviderProductId	4		NO	int	10	0	
optionsStatus	5	'active'	NO	enum			
optionsCreatedat	6	current_timestamp(6)	NO	datetime			
optionsUpdatedat	7	current_timestamp(6)	NO	datetime			
*/

/*systemCategory
id	1		NO	int	10	0	
category	2		NO	varchar			
color	3		NO	varchar			
image	4		NO	varchar			
optionsStatus	5	'active'	NO	enum			
optionsCreatedat	6	current_timestamp(6)	NO	datetime			
optionsUpdatedat	7	current_timestamp(6)	NO	datetime			
*/

/*systemSubcategory
id	1		NO	int	10	0	
subcategory	2		NO	varchar			
categoryId	3	NULL	YES	int	10	0	
optionsStatus	4	'active'	NO	enum			
optionsCreatedat	5	current_timestamp(6)	NO	datetime			
optionsUpdatedat	6	current_timestamp(6)	NO	datetime			
*/
