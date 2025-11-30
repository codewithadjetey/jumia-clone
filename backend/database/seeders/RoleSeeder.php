<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Create roles
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'sanctum']);
        $userRole = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'sanctum']);

        // Create admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@jumia.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'),
            ]
        );
        $admin->assignRole($adminRole);

        // Create regular user
        $user = User::firstOrCreate(
            ['email' => 'user@jumia.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password'),
            ]
        );
        $user->assignRole($userRole);
    }
}
