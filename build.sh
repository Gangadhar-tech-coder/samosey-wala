#!/usr/bin/env bash
# Exit immediately on error
set -o errexit

echo "--- Installing Python dependencies ---"
pip install -r requirements.txt

echo "--- Collecting static files via WhiteNoise ---"
python manage.py collectstatic --no-input

echo "--- Applying database migrations ---"
python manage.py migrate

echo "--- Seeding initial database records (if empty) ---"
python seed_data.py || true

echo "--- Build complete! ---"
