-- DropForeignKey
ALTER TABLE `bank_account_transactions` DROP FOREIGN KEY `bank_account_transactions_destination_account_id_fkey`;

-- DropForeignKey
ALTER TABLE `bank_account_transactions` DROP FOREIGN KEY `bank_account_transactions_source_account_id_fkey`;

-- DropForeignKey
ALTER TABLE `bank_accounts` DROP FOREIGN KEY `bank_accounts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bank_accounts` ADD CONSTRAINT `bank_accounts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bank_account_transactions` ADD CONSTRAINT `bank_account_transactions_source_account_id_fkey` FOREIGN KEY (`source_account_id`) REFERENCES `bank_accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bank_account_transactions` ADD CONSTRAINT `bank_account_transactions_destination_account_id_fkey` FOREIGN KEY (`destination_account_id`) REFERENCES `bank_accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
