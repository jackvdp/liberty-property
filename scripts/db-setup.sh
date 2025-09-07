#!/bin/bash

# Liberty Bell Database Setup Script
# Helps manage dev/prod database operations

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env.local exists
if [ ! -f .env.local ]; then
    print_error ".env.local not found!"
    print_info "Creating from .env.example..."
    cp .env.example .env.local
    print_warning "Please edit .env.local with your Supabase credentials"
    exit 1
fi

# Menu
echo "═══════════════════════════════════════"
echo "  Liberty Bell Database Management"
echo "═══════════════════════════════════════"
echo ""
echo "Current Environment: ${NODE_ENV:-development}"
echo ""
echo "1) Setup Development Database"
echo "2) Reset Development Database"
echo "3) Seed Development Data"
echo "4) Open Database Studio"
echo "5) Generate Migration Files"
echo "6) Create Production Backup"
echo "7) Check Database Status"
echo "0) Exit"
echo ""
read -p "Select an option: " choice

case $choice in
    1)
        print_info "Setting up development database..."
        npm run db:generate
        npm run db:push
        print_info "Database schema pushed!"
        read -p "Would you like to seed test data? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            npm run db:seed
        fi
        print_info "Setup complete!"
        ;;
    
    2)
        print_warning "This will DELETE all data in your development database!"
        read -p "Are you sure? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            print_info "Resetting database..."
            npm run db:push -- --force
            npm run db:seed
            print_info "Database reset complete!"
        else
            print_info "Reset cancelled"
        fi
        ;;
    
    3)
        print_info "Seeding development data..."
        npm run db:seed
        print_info "Seed complete!"
        ;;
    
    4)
        print_info "Opening Drizzle Studio..."
        npm run db:studio
        ;;
    
    5)
        print_info "Generating migration files..."
        npm run db:generate
        print_info "Migration files generated in lib/db/migrations/"
        ;;
    
    6)
        print_error "Production backup should be done through Supabase Dashboard"
        print_info "Go to: https://app.supabase.com/project/[your-project]/database/backups"
        ;;
    
    7)
        print_info "Checking database connection..."
        node -e "
        require('dotenv').config({ path: '.env.local' });
        const url = process.env.DATABASE_URL;
        if (url) {
            console.log('✅ DATABASE_URL is set');
            console.log('📍 Database:', url.substring(0, 50) + '...');
        } else {
            console.log('❌ DATABASE_URL not found');
        }
        const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        if (supaUrl) {
            console.log('✅ SUPABASE_URL is set');
            console.log('📍 Project:', supaUrl);
        } else {
            console.log('❌ SUPABASE_URL not found');
        }
        "
        ;;
    
    0)
        print_info "Goodbye!"
        exit 0
        ;;
    
    *)
        print_error "Invalid option"
        exit 1
        ;;
esac
