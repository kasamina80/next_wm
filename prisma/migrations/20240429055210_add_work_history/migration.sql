-- CreateTable
CREATE TABLE `WorkHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_on` DATETIME(3) NOT NULL,
    `end_on` DATETIME(3) NULL,
    `content` VARCHAR(191) NOT NULL,
    `work_type` ENUM('it_engineer', 'idol') NOT NULL,
    `point` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
