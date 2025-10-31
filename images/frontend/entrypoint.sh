#!/bin/sh
# Este script se ejecuta ANTES de que inicie Nginx

# Directorio donde Nginx sirve los archivos compilados de Angular
ANGULAR_DIR="/usr/share/nginx/html"

# Variable inyectada por Kubernetes (contiene: http://backend-service:3000)
API_URL=${FRONTEND_API_URL}

echo "Inyectando variable de entorno API_URL: $API_URL"

# Sustituye el PLACEHOLDER 'http://api.placeholder.com' con el valor real de K8s.
# Asegúrate de que este placeholder esté en tu environment.prod.ts de Angular.
find $ANGULAR_DIR -type f -name "*.js" -print0 | while IFS= read -r -d $'\0' file; do
    # 'sed' realiza la sustitución
    sed -i "s|http://api.placeholder.com|$API_URL|g" "$file"
done

# Inicia Nginx
echo "Iniciando Nginx..."
exec nginx -g "daemon off;"