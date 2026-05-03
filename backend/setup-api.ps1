$API_ID = "lxtlrfodx7"
$ACCOUNT_ID = "962639302274"
$REGION = "ap-south-1"

$ASSESS_ID = "2b9zpg"
$ROADMAP_ID = "08cd63"
$EVALUATE_ID = "ff5291"
$JOBS_ID = "k83u01"
$PASSPORT_ID = "kynzgl"

# ===== ASSESS =====
aws apigateway put-method --rest-api-id $API_ID --resource-id $ASSESS_ID --http-method POST --authorization-type NONE --region $REGION
aws apigateway put-integration --rest-api-id $API_ID --resource-id $ASSESS_ID --http-method POST --type AWS_PROXY --integration-http-method POST --uri "arn:aws:apigateway:${REGION}:lambda:path/2015-03-31/functions/arn:aws:lambda:${REGION}:${ACCOUNT_ID}:function:skillpath-assessment/invocations" --region $REGION
aws apigateway put-method --rest-api-id $API_ID --resource-id $ASSESS_ID --http-method OPTIONS --authorization-type NONE --region $REGION
aws apigateway put-integration --rest-api-id $API_ID --resource-id $ASSESS_ID --http-method OPTIONS --type MOCK --request-templates '{\"application/json\": \"{\\\"statusCode\\\": 200}\"}' --region $REGION

# ===== ROADMAP =====
aws apigateway put-method --rest-api-id $API_ID --resource-id $ROADMAP_ID --http-method POST --authorization-type NONE --region $REGION
aws apigateway put-integration --rest-api-id $API_ID --resource-id $ROADMAP_ID --http-method POST --type AWS_PROXY --integration-http-method POST --uri "arn:aws:apigateway:${REGION}:lambda:path/2015-03-31/functions/arn:aws:lambda:${REGION}:${ACCOUNT_ID}:function:skillpath-roadmap/invocations" --region $REGION
aws apigateway put-method --rest-api-id $API_ID --resource-id $ROADMAP_ID --http-method OPTIONS --authorization-type NONE --region $REGION
aws apigateway put-integration --rest-api-id $API_ID --resource-id $ROADMAP_ID --http-method OPTIONS --type MOCK --request-templates '{\"application/json\": \"{\\\"statusCode\\\": 200}\"}' --region $REGION

# ===== EVALUATE =====
aws apigateway put-method --rest-api-id $API_ID --resource-id $EVALUATE_ID --http-method POST --authorization-type NONE --region $REGION
aws apigateway put-integration --rest-api-id $API_ID --resource-id $EVALUATE_ID --http-method POST --type AWS_PROXY --integration-http-method POST --uri "arn:aws:apigateway:${REGION}:lambda:path/2015-03-31/functions/arn:aws:lambda:${REGION}:${ACCOUNT_ID}:function:skillpath-evaluator/invocations" --region $REGION
aws apigateway put-method --rest-api-id $API_ID --resource-id $EVALUATE_ID --http-method OPTIONS --authorization-type NONE --region $REGION
aws apigateway put-integration --rest-api-id $API_ID --resource-id $EVALUATE_ID --http-method OPTIONS --type MOCK --request-templates '{\"application/json\": \"{\\\"statusCode\\\": 200}\"}' --region $REGION

# ===== JOBS =====
aws apigateway put-method --rest-api-id $API_ID --resource-id $JOBS_ID --http-method POST --authorization-type NONE --region $REGION
aws apigateway put-integration --rest-api-id $API_ID --resource-id $JOBS_ID --http-method POST --type AWS_PROXY --integration-http-method POST --uri "arn:aws:apigateway:${REGION}:lambda:path/2015-03-31/functions/arn:aws:lambda:${REGION}:${ACCOUNT_ID}:function:skillpath-jobs/invocations" --region $REGION
aws apigateway put-method --rest-api-id $API_ID --resource-id $JOBS_ID --http-method OPTIONS --authorization-type NONE --region $REGION
aws apigateway put-integration --rest-api-id $API_ID --resource-id $JOBS_ID --http-method OPTIONS --type MOCK --request-templates '{\"application/json\": \"{\\\"statusCode\\\": 200}\"}' --region $REGION

# ===== PASSPORT =====
aws apigateway put-method --rest-api-id $API_ID --resource-id $PASSPORT_ID --http-method POST --authorization-type NONE --region $REGION
aws apigateway put-integration --rest-api-id $API_ID --resource-id $PASSPORT_ID --http-method POST --type AWS_PROXY --integration-http-method POST --uri "arn:aws:apigateway:${REGION}:lambda:path/2015-03-31/functions/arn:aws:lambda:${REGION}:${ACCOUNT_ID}:function:skillpath-passport/invocations" --region $REGION
aws apigateway put-method --rest-api-id $API_ID --resource-id $PASSPORT_ID --http-method OPTIONS --authorization-type NONE --region $REGION
aws apigateway put-integration --rest-api-id $API_ID --resource-id $PASSPORT_ID --http-method OPTIONS --type MOCK --request-templates '{\"application/json\": \"{\\\"statusCode\\\": 200}\"}' --region $REGION

Write-Host "All methods created!"