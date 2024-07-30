CREATE DATABASE  IF NOT EXISTS `library_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `library_system`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: library_system
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `FK30kim6ktgxc1vj2s359wjlggg` (`created_by`),
  KEY `FKnp3s65pdoldgrriwoj4275ldh` (`updated_by`),
  CONSTRAINT `FK30kim6ktgxc1vj2s359wjlggg` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`),
  CONSTRAINT `FKnp3s65pdoldgrriwoj4275ldh` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES (1,'2024-06-29 14:26:49.049127','Andrew Hunt','2024-07-05 13:35:06.546618',4,4,'Andy Hunt là tác giả viết sách về phát triển phần mềm và khoa học viễn tưởng thú vị. Hunt là đồng tác giả của cuốn sách nổi tiếng \"The Pragmatic Programmer\", cuốn sách nổi tiếng \"Pragmatic Thinking & Learning\", \"Practices of an Agile Developer\" từng đoạt giải thưởng, nửa tá cuốn sách và nhiều bài báo khác. Andy là một trong 17 tác giả đầu tiên của Tuyên ngôn Agile. Ông và đồng tác giả Dave Thomas đã thành lập nhà xuất bản Pragmatic Bookshelf, chuyên về sách dành cho các nhà phát triển phần mềm, người thử nghiệm và nhà quản lý.'),(2,'2024-06-29 14:41:10.828841','David Thomas','2024-07-05 13:37:52.044476',4,4,NULL),(4,'2024-07-06 15:18:16.266068','Alex Banks','2024-07-06 15:18:16.266068',4,4,''),(5,'2024-07-06 15:18:53.239818','Eve Porcello','2024-07-06 15:18:53.239818',4,4,''),(6,'2024-07-06 15:24:21.606021','Robin Wieruch','2024-07-06 15:24:21.606021',4,4,'Robin Wieruch là một kỹ sư web và phần mềm người Đức, người chuyên học và dạy lập trình bằng JavaScript. Sau khi lấy được bằng thạc sĩ về khoa học máy tính, anh tiếp tục tự học hàng ngày. Anh ấy đã tích lũy được kinh nghiệm từ thế giới khởi nghiệp, nơi anh ấy sử dụng JavaScript quá mức trong thời gian làm việc và thời gian rảnh rỗi. Nó cho anh cơ hội dạy người khác về những chủ đề này.\n\nTrong một vài năm, Robin đã làm việc chặt chẽ với một nhóm kỹ sư giỏi tại một công ty có tên Cải tiến Nhỏ để phát triển các ứng dụng quy mô lớn. Công ty cung cấp sản phẩm SaaS cho phép khách hàng đưa ra phản hồi cho công ty của họ. Ứng dụng này được phát triển bằng cách sử dụng JavaScript ở giao diện người dùng và Java ở phần phụ trợ. Ở giao diện người dùng, lần lặp đầu tiên được viết bằng Java với Wicket Framework và jQuery. Khi thế hệ SPA đầu tiên trở nên phổ biến, công ty đã chuyển sang Angular 1.x cho ứng dụng giao diện người dùng. Sau khi sử dụng Angular hơn hai năm, rõ ràng Angular không phải là giải pháp tốt nhất để làm việc với các ứng dụng cường độ cao ngày trước. Đó là lý do tại sao công ty đã thực hiện bước nhảy vọt cuối cùng sang React và Redux, giúp công ty có thể hoạt động thành công trên quy mô lớn.\n\nTrong thời gian làm việc tại công ty, Robin thường xuyên viết bài về phát triển web trên trang web của mình. Anh ấy đã nhận được phản hồi tuyệt vời từ mọi người về các bài báo của mình và điều đó cho phép anh ấy cải thiện phong cách viết và giảng dạy của mình. Hết bài này đến bài khác, khả năng dạy dỗ người khác của Robin ngày càng tăng. Bài viết đầu tiên của anh ấy chứa quá nhiều thứ khiến học sinh cảm thấy choáng ngợp, nhưng anh ấy đã cải thiện nó theo thời gian bằng cách tập trung và chỉ dạy một môn học.\n\nNgày nay, Robin là một giáo viên tự kinh doanh. Anh nhận thấy đây là một hoạt động thú vị khi chứng kiến ​​học sinh phát triển bằng cách đưa ra cho các em những mục tiêu rõ ràng và vòng phản hồi ngắn. Đó là một điều bạn sẽ học được ở một công ty phản hồi, phải không? Nhưng nếu không tự mình viết mã, anh ấy sẽ không thể dạy mọi thứ. Đó là lý do anh đầu tư thời gian còn lại vào việc lập trình. Bạn có thể tìm thêm thông tin về Robin cũng như cách hỗ trợ và làm việc với anh ấy trên trang web của anh ấy.'),(7,'2024-07-06 15:33:32.954965','Shinichi Suzuki','2024-07-06 15:35:37.841215',4,4,''),(9,'2024-07-06 18:56:07.571703','Julia Cameron','2024-07-06 18:56:07.571703',4,4,'Julia Cameron đã là một nghệ sĩ tích cực trong hơn ba mươi năm. Cô là tác giả của hơn ba mươi cuốn sách, tiểu thuyết và phi hư cấu, bao gồm các tác phẩm bán chạy nhất về quá trình sáng tạo: Con đường nghệ sĩ, Đi bộ trong thế giới này, Đi tìm nước và Chế độ ăn kiêng viết lách. Là một tiểu thuyết gia, nhà viết kịch, nhạc sĩ và nhà thơ, cô có nhiều thành tích trong lĩnh vực sân khấu, điện ảnh và truyền hình.\n\nNỗ lực mới nhất: Julia Cameron Live, một khóa học trực tuyến và cộng đồng nghệ sĩ do Julia dẫn đầu. Đây là cuộc thảo luận toàn diện nhất mà cô từng thực hiện trên The Artist\'s Way và là lần đầu tiên cô cho phép camera vào nhà mình.'),(10,'2024-07-08 10:31:25.508964','Aurélien Géron','2024-07-10 20:58:31.001064',4,4,'Aurélien Géron là nhà tư vấn về Machine Learning. Là một cựu nhân viên của Google, ông đã lãnh đạo nhóm phân loại video YouTube từ năm 2013 đến năm 2016. Ông cũng là người sáng lập và CTO của Wifirst từ năm 2002 đến 2012, một ISP không dây hàng đầu ở Pháp, đồng thời là người sáng lập và CTO của Polyconseil vào năm 2001, công ty hiện quản lý dịch vụ chia sẻ xe điện Autolib\'.\n\nTrước đó, ông làm kỹ sư trong nhiều lĩnh vực: tài chính (JP Morgan và Société Générale), quốc phòng (DOD của Canada) và chăm sóc sức khỏe (truyền máu). Ông đã xuất bản một số cuốn sách kỹ thuật (về kiến ​​trúc C++, WiFi và Internet) và là giảng viên Khoa học Máy tính tại một trường kỹ thuật của Pháp.\n\nMột vài sự thật thú vị: anh ấy dạy 3 đứa con của mình đếm nhị phân bằng ngón tay (lên tới 1023), anh ấy nghiên cứu về vi sinh vật học và di truyền học tiến hóa trước khi theo học ngành công nghệ phần mềm, và chiếc dù của anh ấy không mở ra ở lần nhảy thứ 2.'),(11,'2024-07-09 15:54:06.258157','Phil Elwood','2024-07-09 15:54:06.258157',4,4,'Phil Elwood là một nhân viên quan hệ công chúng. Anh sinh ra ở Thành phố New York, lớn lên ở Idaho và chuyển đến Washington, DC ở tuổi 20 để thực tập cho Thượng nghị sĩ Daniel Patrick Moynihan. Anh ấy đã hoàn thành bằng đại học tại Đại học Georgetown và học cao học tại Trường Kinh tế Luân Đôn trước khi bắt đầu sự nghiệp của mình tại một công ty PR nhỏ. Trong hai thập kỷ qua, Elwood đã làm việc cho một số công ty PR hàng đầu và kém cỏi ở Washington. Anh ấy sống ở DC.'),(15,'2024-07-27 10:02:17.025262','Ian Miell','2024-07-27 10:02:17.025262',4,4,''),(16,'2024-07-27 10:02:38.132523','Aidan Hobson Sayers','2024-07-27 10:02:38.132523',4,4,''),(19,'2024-07-27 20:53:07.861465','Ethem Mining','2024-07-27 20:53:07.861465',4,4,''),(20,'2024-07-28 02:23:35.279758','Workman Publishing','2024-07-28 02:23:35.280836',4,4,'Nhà xuất bản Workman xuất bản sách về tất cả những khoảnh khắc lớn nhỏ trong cuộc sống, được tạo ra bằng niềm đam mê, niềm vui, sự chăm chỉ và tinh thần độc lập mãnh liệt. Chúng là những loại sách mà bạn sẽ tự hỏi làm thế nào bạn có thể sống thiếu chúng và những cuốn lịch giúp đếm từng ngày. Chúng tôi xuất bản Brain Quest®, bộ sách giáo dục bán chạy số 1 trong nước, Điều gì sẽ xảy ra khi bạn đang mong đợi, hướng dẫn mang thai và nuôi dạy con cái bán chạy nhất thế giới, sách dạy nấu ăn từng đoạt giải thưởng, sách dành cho trẻ em, sách du lịch độc đáo và sách về bản thân. -giúp đỡ, làm thủ công, làm vườn—và mèo! Nhân tiện, chúng tôi cũng đã phát minh ra Lịch từng trang một.'),(21,'2024-07-28 02:40:54.046561','Rachel Ignotofsky','2024-07-28 02:40:54.046561',4,4,'Rachel Ignotofsky là tác giả và họa sĩ minh họa bán chạy nhất của New York Times, có trụ sở tại California. Cô lớn lên ở New Jersey với chế độ ăn uống lành mạnh gồm phim hoạt hình và bánh pudding. Cô tốt nghiệp trường nghệ thuật Tyler vào năm 2011.\n\nRachel làm việc cho chính mình và dành cả ngày lẫn đêm để vẽ, viết và học hỏi nhiều nhất có thể. Rachel là tác giả đã xuất bản sách của 10 Speed ​​Press và luôn nghĩ ra những ý tưởng mới. Hãy xem các cuốn sách của cô ấy Hoạt động kỳ diệu của hành tinh Trái đất, Phụ nữ trong khoa học, Phụ nữ trong nghệ thuật và Phụ nữ trong thể thao.\n\nCông việc của cô được lấy cảm hứng từ lịch sử và khoa học. Cô tin rằng minh họa là một công cụ mạnh mẽ có thể khiến việc học trở nên thú vị. Cô ấy có niềm đam mê với việc thu thập thông tin dày đặc và làm cho nó trở nên thú vị và dễ tiếp cận. Rachel hy vọng có thể sử dụng công việc của mình để truyền bá thông điệp của mình về kiến ​​thức khoa học và nữ quyền.'),(22,'2024-07-28 08:36:17.644044','Chris Oxlade ','2024-07-28 08:36:17.644044',4,4,''),(23,'2024-07-28 08:45:01.608614','Various ','2024-07-28 08:45:01.608614',4,4,'');
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `benefits`
--

DROP TABLE IF EXISTS `benefits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `benefits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `benefits`
--

LOCK TABLES `benefits` WRITE;
/*!40000 ALTER TABLE `benefits` DISABLE KEYS */;
INSERT INTO `benefits` VALUES (1,'Được mượn 2 cuốn sách trong một lần mượn','Được mượn 2 cuốn sách trong một lần mượn'),(2,'Được mượn 3 cuốn sách trong một lần mượn','Được mượn 3 cuốn sách trong một lần mượn'),(3,'Được mượn 5 cuốn sách trong một lần mượn','Được mượn 5 cuốn sách trong một lần mượn'),(4,'Giảm giá khi sử dụng dịch vụ in ấn và photocopy tại thư viện.','Giảm giá khi sử dụng dịch vụ in ấn và photocopy tại thư viện.'),(5,'Đọc sách tại chỗ','Thành viên được miễn phí đọc và sử dụng sách của thư viện tại chỗ'),(6,'Ưu tiên đặt trước các đầu sách mới','Đặt trước sách mới: Ưu tiên đặt trước các đầu sách mới'),(7,'Được hưởng ưu đãi giảm giá đặc biệt khi mua sách từ thư viện.','Ưu đãi giảm giá khi mua sách tại thư viện: Được hưởng ưu đãi giảm giá đặc biệt khi mua sách từ thư viện.'),(8,'Giao sách tận nhà nếu không thể đến thư viện.','Dịch vụ giao sách tận nhà: Giao sách tận nhà nếu không thể đến thư viện.');
/*!40000 ALTER TABLE `benefits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `isbn` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `publication_year` int DEFAULT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `status` enum('ACTIVE','AVAILABLE','BORROWED','DAMAGED','INACTIVE','LOST','OUT_OF_STOCK') DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `total_page` int DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `FKkjuhf186v8xfqqig9k2hsol5r` (`created_by`),
  KEY `FKd92cqwbn1a3eo00ov7dg9yhty` (`updated_by`),
  CONSTRAINT `FKd92cqwbn1a3eo00ov7dg9yhty` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`),
  CONSTRAINT `FKkjuhf186v8xfqqig9k2hsol5r` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (29,'1492051721','2024-07-06 15:23:08.111691','1720317438788.jpg','English',50000.00,2020,'O\'Reilly Media','INACTIVE','Learning React: Modern Patterns for Developing React Apps ',307,'2024-07-22 22:52:37.175422',4,4,'Nếu bạn muốn tìm hiểu cách xây dựng các ứng dụng React hiệu quả thì đây là cuốn sách dành cho bạn. Lý tưởng cho các nhà phát triển web và kỹ sư phần mềm hiểu cách JavaScript, CSS và HTML hoạt động trong trình duyệt, phiên bản cập nhật này cung cấp các phương pháp và mẫu tốt nhất để viết mã React hiện đại. Không cần có kiến ​​thức trước về React hoặc JavaScript chức năng.\n\nVới lộ trình học tập của mình, các tác giả Alex Banks và Eve Porcello chỉ cho bạn cách tạo giao diện người dùng có thể hiển thị khéo léo các thay đổi mà không cần tải lại trang trên các trang web dựa trên dữ liệu, quy mô lớn. Bạn cũng sẽ khám phá cách làm việc với lập trình chức năng và các tính năng ECMAScript mới nhất. Sau khi tìm hiểu cách xây dựng các thành phần React bằng hướng dẫn thực hành này, bạn sẽ hiểu React có thể hữu ích như thế nào trong tổ chức của bạn.\n\nHiểu các khái niệm lập trình chức năng chính bằng JavaScript Xem chi tiết để tìm hiểu cách React chạy trong trình duyệt Tạo các lớp trình bày ứng dụng với các thành phần React Quản lý dữ liệu và giảm thời gian bạn gỡ lỗi ứng dụng Kết hợp React Hooks để quản lý trạng thái và tìm nạp dữ liệu Sử dụng giải pháp định tuyến cho các tính năng của ứng dụng một trang Tìm hiểu cách cấu trúc các ứng dụng React có lưu ý đến máy chủ'),(30,'9781720043997','2024-07-06 15:31:16.450543','1720377709373.jpg','English',69000.00,2018,'Robin Wieruch','ACTIVE','The Road to React: Your journey to master plain yet pragmatic React.js',286,'2024-07-08 01:41:49.377712',4,4,'LAST UPDATE: 5. February 2024\n\nThe Road to React: The React.js with Hooks in JavaScript Book (2024 Edition) - is a comprehensive and pragmatic yet concise React 18 with Hooks (+ opt-in TypeScript) book. Purchase of this book includes free online access to the always up-to-date digital book.\n\nWhat you will learn.\n\n\"The Road to React\" made its debut in 2016, and since then, I\'ve almost rewritten it annually. This book teaches the core principles of React, guiding you through building a practical application in pure React without complex tooling. The book covers everything from setting up the project to deploying it on a server. Each chapter includes additional recommended reading and exercises. By the end, you\'ll have the skills to develop your own React applications.\n\nIn \"The Road to React,\" I establish a solid foundation before delving into the broader React ecosystem. The book clarifies general concepts, patterns, and best practices for real-world React applications. Ultimately, you\'ll learn to construct a React application from scratch, incorporating features such as pagination, client-side and server-side searching, and advanced UI interactions like sorting.'),(31,'0739048120','2024-07-06 15:38:41.130331','1720377729645.jpg','English',50000.00,1995,'Alfred Music','ACTIVE','Suzuki Violin School',36,'2024-07-08 01:42:09.649318',4,4,'Dạy violin với Trường dạy violin Suzuki nổi tiếng. Phương pháp Suzuki(R) về Giáo dục Tài năng dựa trên quan điểm của Shinichi Suzuki rằng mọi đứa trẻ đều sinh ra đã có năng khiếu, và con người là sản phẩm của môi trường. Theo Shinichi Suzuki, một nghệ sĩ violin và giáo viên nổi tiếng thế giới, niềm vui lớn nhất mà người lớn có thể biết đến là phát triển tiềm năng của trẻ em để trẻ có thể thể hiện tất cả những gì hài hòa và tốt nhất ở con người. Học viên được dạy theo phương pháp \"tiếng mẹ đẻ\". Mỗi bộ sách dành cho một nhạc cụ cụ thể trong Phương pháp Suzuki được coi là trường dạy nhạc Suzuki, chẳng hạn như Trường dạy vĩ cầm Suzuki. Các bài học Suzuki thường được cung cấp trong bối cảnh phòng thu riêng với các bài học nhóm bổ sung. Học viên nghe các bản ghi âm và làm việc với giáo viên dạy vĩ cầm Suzuki của mình để phát triển tiềm năng của mình với tư cách là một nhạc sĩ và một con người.\n\nSách Suzuki này là một phần không thể thiếu trong các bài học vĩ cầm Suzuki. Phiên bản sửa đổi này của Trường dạy vĩ cầm Suzuki, Tập 2 có:\n* Biên tập lại các bản nhạc, bao gồm cả cách kéo vĩ và bấm ngón\n* 16 trang bổ sung\n* Các bài tập bổ sung, một số bài của Shinichi Suzuki, cùng với những hiểu biết sâu sắc và gợi ý bổ sung cho giáo viên\n* Văn bản bằng tiếng Anh, tiếng Pháp, tiếng Đức và tiếng Tây Ban Nha\n* Hướng dẫn ký hiệu âm nhạc\n* Vị trí cần đàn.\n'),(32,'0874874394','2024-07-06 15:41:37.826838','1720314575325.jpg','English',59000.00,1995,'Alfred Music','ACTIVE','I Can Read Music',108,'2024-07-07 08:09:35.327606',4,4,'Những bài tập dễ đọc, tiến bộ này của Joanne Martin phát triển kỹ năng đọc của học sinh theo từng giai đoạn, với nhiều lần lặp lại ở mỗi giai đoạn. I Can Read Music được thiết kế như một cuốn sách đọc nốt nhạc đầu tiên dành cho học viên chơi nhạc cụ dây đã học chơi bằng cách sử dụng phương pháp tiếp cận âm thanh như Phương pháp Suzuki (R) hoặc dành cho những học viên được dạy theo kiểu truyền thống cần thực hành đọc nốt nhạc thêm. Trình bày các ý tưởng mới của nó đủ rõ ràng để trẻ nhỏ và cha mẹ chúng có thể sử dụng hàng ngày ở nhà, giáo viên sẽ kiểm tra tiến độ mỗi tuần hoặc hai tuần.'),(34,'9780143129257','2024-07-07 08:07:39.642679','1720314461626.jpg','English',50000.00,2016,'TarcherPerigee','ACTIVE','The Artist\'s Way: 30th Anniversary Edition',272,'2024-07-07 08:07:41.635627',4,4,'Kể từ lần xuất bản đầu tiên, hiện tượng Con đường nghệ sĩ đã truyền cảm hứng cho thiên tài Elizabeth Gilbert và hàng triệu độc giả bắt tay vào hành trình sáng tạo và tìm ra mối liên hệ sâu sắc hơn với quá trình và mục đích. Cách tiếp cận mới lạ của Julia Cameron hướng dẫn người đọc khám phá các lĩnh vực có vấn đề và các điểm áp lực có thể hạn chế dòng sáng tạo của họ, đồng thời đưa ra các kỹ thuật để giải phóng bất kỳ lĩnh vực nào mà họ có thể bị mắc kẹt, mở ra cơ hội phát triển bản thân và khám phá bản thân.'),(35,'1250321573','2024-07-09 16:02:57.607953','1720515779625.jpg','English',40000.00,2024,'Henry Holt and Co.','ACTIVE','All the Worst Humans: How I Made News for Dictators, Tycoons, and Politicians',272,'2024-07-09 16:02:59.632734',4,4,'\"Một câu chuyện thú vị, có ảnh hưởng bất ngờ... Nó sẽ là một trong những cuốn sách Beltway lớn và gây xôn xao trong năm.\"\n\n―Chính trị\n\nMột cuốn hồi ký gây náo loạn, đốt cầu của một nhân viên PR hàng đầu ở Washington, người đã vạch trần những bí mật của ngành công nghiệp trị giá 129 tỷ đô la kiểm soát rất nhiều điều chúng ta thấy và nghe trên các phương tiện truyền thông – từ một người đàn ông từng giật dây, và người lúc này đang kéo rèm lại.\n\nSau gần hai thập kỷ làm việc trong lĩnh vực quan hệ công chúng ở Washington, Elwood muốn làm rõ bằng cách vạch trần những mặt tối của chính ngành công nghiệp đã giúp ông thành công như vậy. Bước đầu tiên là tiết lộ chính xác những gì anh ấy đã làm trong hai mươi năm qua – và nó không hề đẹp đẽ chút nào.\n\nElwood đã làm việc cho một loạt khách hàng đáng ngờ của một kẻ sát nhân, bao gồm Gaddafi, Assad và chính phủ Qatar. Trong All the Worst Humans, Elwood tiết lộ cách hoạt động của ngành PR cũng như cách sự thật được tạo ra, quay vòng và bán cho công chúng – không né tránh những chi tiết gai góc về sự nghiệp khó có thể xảy ra của anh.\n\nĐây là một cái nhìn sâu sắc về các hành lang của tiền bạc, quyền lực, chính trị và quyền kiểm soát, tất cả đều được kể bằng giọng nói hài hước và thú vị của Elwood. Anh kể lại cuộc gặp mặt trực tiếp bốn ngày ở Las Vegas với con trai của một nhà độc tài, vạch ra các chiến lược truyền thông chống lại một tổ chức khủng bố ở Tây Phi và giúp vợ của một nhà độc tài ở Trung Đông có được một hình ảnh nổi bật trên tạp chí Vogue cùng thời điểm Mùa xuân Ả Rập nổ ra. Và anh ta tiết lộ tất cả những thủ đoạn tinh vi của mình để dụ dỗ các nhà báo nhằm tạo ra sự hỗn loạn và cuối cùng là che đậy cho các chính trị gia, những kẻ độc tài và gián điệp – những chiến thuật bí mật trong ngành đã dẫn đến việc anh ta trở thành một chuyên gia PR chính trị.\n\nTrên đường đi, Phil đi bộ trong các sảnh của Điện Capitol, lái những chiếc xe bọc thép qua Abuja và chứng kiến ​​khách hàng của mình mất thu nhập hàng năm tại bàn roulette. Nhưng khi thăng cấp, anh càng cảm thấy tồi tệ hơn về sự nhếch nhác của tất cả – cho đến khi Elwood nhận được một cuộc gọi cảnh tỉnh gây sốc từ FBI. Trò chơi mạo hiểm này suýt khiến Elwood phải trả giá bằng mạng sống và sự tự do của mình. Nhìn thấy ánh sáng, Elwood quyết định thay đổi cách làm của mình cũng như khách hàng của mình và nói ra sự thật đầy đủ về việc ai là người tồi tệ nhất.'),(36,'1098125975','2024-07-10 21:01:21.513297','1720620083527.jpg','English',50000.00,2022,'O\'Reilly Media','ACTIVE','Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow: Concepts, Tools, and Techniques to Build Intelligent Systems',861,'2024-07-10 21:01:23.530768',4,4,'Thông qua một loạt đột phá gần đây, deep learning đã thúc đẩy toàn bộ lĩnh vực machine learning. Giờ đây, ngay cả những lập trình viên gần như không biết gì về công nghệ này cũng có thể sử dụng các công cụ đơn giản, hiệu quả để triển khai các chương trình có khả năng học từ dữ liệu. Cuốn sách bán chạy nhất này sử dụng các ví dụ cụ thể, lý thuyết tối thiểu và các khung Python sẵn sàng sản xuất (Scikit-Learn, Keras và TensorFlow) để giúp bạn hiểu biết trực quan về các khái niệm và công cụ để xây dựng hệ thống thông minh.\n\nVới phiên bản thứ ba được cập nhật này, tác giả Aurélien Géron khám phá một loạt các kỹ thuật, bắt đầu bằng hồi quy tuyến tính đơn giản và tiến tới mạng lưới thần kinh sâu. Nhiều ví dụ về mã và bài tập xuyên suốt cuốn sách giúp bạn áp dụng những gì đã học. Kinh nghiệm lập trình là tất cả những gì bạn cần để bắt đầu.\n\nSử dụng Scikit-learn để theo dõi một dự án ML mẫu từ đầu đến cuối\n\nKhám phá một số mô hình, bao gồm máy vectơ hỗ trợ, cây quyết định, rừng ngẫu nhiên và phương pháp tập hợp\n\nKhai thác các kỹ thuật học tập không giám sát như giảm kích thước, phân cụm và phát hiện bất thường\n\nĐi sâu vào các kiến ​​trúc mạng nơ-ron, bao gồm mạng tích chập, mạng hồi quy, mạng đối nghịch tổng quát, bộ mã hóa tự động, mô hình khuếch tán và máy biến áp\n\nSử dụng TensorFlow và Keras để xây dựng và huấn luyện mạng lưới thần kinh cho thị giác máy tính, xử lý ngôn ngữ tự nhiên, mô hình tổng quát và học tăng cường sâu'),(37,'1718502702','2024-07-11 08:52:59.154559','1720662780991.jpg','English',50000.00,2023,'No Starch Press','ACTIVE','Python Crash Course, 3rd Edition: A Hands-On, Project-Based Introduction to Programming',552,'2024-07-11 08:53:01.000133',4,4,'Python Crash Course là cuốn sách lập trình bán chạy nhất thế giới, với hơn 1.500.000 bản được bán cho đến nay!\n\nKhóa học Python Crash là hướng dẫn bán chạy nhất thế giới về ngôn ngữ lập trình Python. Phần giới thiệu kỹ lưỡng, nhịp độ nhanh này sẽ giúp bạn viết chương trình, giải quyết vấn đề và phát triển các ứng dụng hoạt động một cách nhanh chóng.\n\nBạn sẽ bắt đầu bằng cách học các khái niệm lập trình cơ bản, chẳng hạn như biến, danh sách, lớp và vòng lặp, đồng thời thực hành viết mã sạch với các bài tập cho từng chủ đề. Bạn cũng sẽ tìm hiểu cách làm cho chương trình của mình có tính tương tác và kiểm tra mã của bạn một cách an toàn trước khi thêm mã đó vào dự án. Bạn sẽ áp dụng kiến ​​thức mới của mình vào thực tế bằng cách tạo một trò chơi điện tử lấy cảm hứng từ Space Invaders, xây dựng một bộ trực quan hóa dữ liệu bằng các thư viện tiện dụng của Python và triển khai một ứng dụng đơn giản trực tuyến.\n\nKhi đọc hết cuốn sách, bạn sẽ học cách:\n\nSử dụng các thư viện và công cụ Python mạnh mẽ, bao gồm pytest, Pygame, Matplotlib, Plotly và Django\n\nTạo các trò chơi 2D ngày càng phức tạp đáp ứng các thao tác nhấn phím và nhấp chuột\n\nTạo trực quan hóa dữ liệu tương tác bằng nhiều bộ dữ liệu\n\nXây dựng các ứng dụng cho phép người dùng tạo tài khoản và quản lý dữ liệu của riêng họ cũng như triển khai ứng dụng của bạn trực tuyến\n\nKhắc phục lỗi mã hóa và giải quyết các vấn đề lập trình phổ biến\n\nTính năng mới đối với phiên bản này: Phiên bản thứ ba này được sửa đổi hoàn toàn để phản ánh mã Python mới nhất. Phạm vi mới và cập nhật bao gồm Mã VS để chỉnh sửa văn bản, mô-đun pathlib để xử lý tệp, pytest để kiểm tra mã của bạn cũng như các tính năng mới nhất của Matplotlib, Plotly và Django.\n\nNếu bạn đang nghĩ đến việc đào sâu vào lập trình, Python Crash Course sẽ cung cấp cho bạn các kỹ năng để viết chương trình thực tế một cách nhanh chóng. Tại sao phải chờ đợi lâu hơn nữa? Khởi động động cơ và mã của bạn!'),(38,'9780201616224','2024-07-22 23:22:51.188239','1720314653664.jpg','English',70000.00,1999,'Addison-Wesley Professional','ACTIVE','The Pragmatic Programmer: From Journeyman to Master',352,'2024-07-22 23:22:53.175373',4,4,'Ward Cunningham Đi thẳng từ con đường lập trình, Lập trình viên thực dụng vượt qua sự chuyên môn hóa và kỹ thuật ngày càng tăng của việc phát triển phần mềm hiện đại để kiểm tra quy trình cốt lõi--nhận yêu cầu và tạo ra mã có thể hoạt động, có thể bảo trì làm hài lòng người dùng. Nó bao gồm các chủ đề từ trách nhiệm cá nhân và phát triển nghề nghiệp đến các kỹ thuật kiến ​​trúc để giữ cho mã của bạn linh hoạt, dễ thích ứng và tái sử dụng. Hãy đọc cuốn sách này và bạn sẽ học cách Chống lại sự hư hỏng của phần mềm; Tránh bẫy sao chép kiến ​​thức; Viết mã linh hoạt, năng động và dễ thích ứng; Tránh lập trình một cách ngẫu nhiên; Chống đạn cho mã của bạn bằng các hợp đồng, xác nhận và ngoại lệ; Nắm bắt yêu cầu thực tế; Kiểm tra một cách tàn nhẫn và hiệu quả; Làm hài lòng người dùng của bạn; Xây dựng đội ngũ lập trình viên thực dụng; và Làm cho sự phát triển của bạn chính xác hơn bằng tự động hóa. Được viết dưới dạng một loạt các phần khép kín và chứa đầy những giai thoại thú vị, những ví dụ đáng suy ngẫm và những so sánh thú vị, Lập trình viên thực dụng minh họa những phương pháp hay nhất và những cạm bẫy lớn của nhiều khía cạnh khác nhau của phát triển phần mềm. Cho dù bạn là một lập trình viên mới, một chương trình có kinh nghiệm.'),(39,'1617294802','2024-07-27 10:06:20.183560','1722087972752.jpg','English',40000.00,2019,'Manning','ACTIVE','Docker in Practice, Second Edition',384,'2024-07-27 20:46:12.754717',4,4,'Docker in Practice, Phiên bản thứ hai trình bày hơn 100 kỹ thuật thực tế, được chọn lọc kỹ lưỡng để giúp bạn tận dụng tối đa Docker. Theo định dạng Vấn đề/Giải pháp/Thảo luận, bạn sẽ xem qua các ví dụ cụ thể mà bạn có thể sử dụng ngay lập tức và bạn sẽ nhận được hướng dẫn của chuyên gia về các kỹ thuật mà bạn có thể áp dụng cho toàn bộ các tình huống.'),(40,'1671228081','2024-07-27 20:58:13.406068','1722094490695.jpg','English',50000.00,2019,'Xuất bản độc lập','ACTIVE','Linux for Beginners: A Practical and Comprehensive Guide to Learn Linux Operating System and Master Linux Command Line. Contains Self-Evaluation Tests to Verify Your Learning Level',196,'2024-07-27 22:34:50.698932',4,4,'Linux chắc chắn là hệ điều hành mạnh nhất thế giới. Đúng, bạn có thể nghĩ Windows và macOS là những hệ điều hành mạnh mẽ vì chúng kiểm soát phần lớn thị trường PC nhưng tôi có một số số liệu thống kê sẽ thay đổi quan điểm của bạn:\n\nTính đến năm 2023\n\n100% siêu máy tính trên thế giới chạy trên Linux\n\n23 trong số 25 trang web hàng đầu thế giới chạy trên Linux\n\n96,3% trong số 1 triệu máy chủ hàng đầu thế giới chạy trên Linux\n\n90% cơ sở hạ tầng đám mây của thế giới hoạt động trên Linux\n\nTất cả các máy chủ đám mây tốt nhất đều chạy trên Linux'),(41,'1523502770','2024-07-28 02:35:52.562100','1722108954482.jpg','English',50000.00,2020,'Workman Publishing Company','ACTIVE','Everything You Need to Ace Computer Science and Coding in One Big Fat Notebook: The Complete Middle School Study Guide (Big Fat Notebooks)',576,'2024-07-28 02:35:54.485477',4,4,'Cuốn sổ tay Big Fat này giúp bạn “đắm chìm” tất cả các khái niệm chính, công cụ ghi nhớ, định nghĩa, sơ đồ và hình vẽ nguệch ngoạc để giúp bạn hiểu về khoa học máy tính.\n\n \n\nBao gồm:\n\nHệ thống máy tính\n\nMã nhị phân\n\nThuật toán\n\nTư duy tính toán\n\nVòng lặp, sự kiện và thủ tục\n\nLập trình bằng Scratch và Python\n\nBiểu thức Boolean\n\nphát triển web\n\nAn ninh mạng\n\nHTML\n\nCSS\n\n…và hơn thế nữa!\n\n \n\nBộ truyện Big Fat Notebook được xây dựng dựa trên một ý tưởng đơn giản và không thể cưỡng lại được—mượn những ghi chú của đứa trẻ thông minh nhất lớp. Mỗi cuốn sách trong bộ sách đều đáp ứng Tiêu chuẩn cốt lõi chung của Tiểu bang, Tiêu chuẩn khoa học thế hệ tiếp theo và tiêu chuẩn lịch sử của tiểu bang, đồng thời được các giáo viên đoạt Giải thưởng Giáo viên của Năm của Quốc gia và Tiểu bang kiểm duyệt. Chúng làm cho việc học trở nên thú vị và là bước tiếp theo hoàn hảo cho mọi đứa trẻ lớn lên trong Brain Quest.'),(42,'1398831093','2024-07-28 08:39:19.696042','1722130761705.jpg','English',50000.00,2023,'Nik Neves','ACTIVE','Computer Science for Curious Kids: An Illustrated Introduction to Software Programming, Artificial Intelligence, Cyber-Security-and More!',128,'2024-07-28 08:39:21.709677',4,4,'Trẻ em có thể khám phá những điều kỳ diệu của máy tính, từ những bước phát triển ban đầu cho đến những công nghệ mới nhất, trong cuốn sách hướng dẫn bìa cứng đầy cảm hứng và dễ tiếp cận này, được minh họa đẹp mắt bằng đầy màu sắc.\n\nThế giới của chúng ta có rất nhiều máy tính, từ những chiếc máy tính đơn giản đến những chiếc điện thoại thông minh giúp chúng ta có thể kết nối Internet trong tầm tay. Hướng dẫn thú vị này theo dõi lịch sử của những phát triển khoa học này và cách các hệ thống máy tính hiện đại hoạt động ngày nay, bao gồm AI, mã hóa, robot và nhiều hơn thế nữa! Những khái niệm mới to lớn hiện ra trên trang giấy nhờ vào sơ đồ sinh động và phong cách văn xuôi lôi cuốn, tràn đầy năng lượng. Trẻ em sẽ thích chia sẻ chúng với bạn bè và gia đình!\n'),(44,'9781480398023','2024-07-28 08:57:55.795005','1722132015093.jpg','English',50000.00,2015,'Không có nhà xuất bản','ACTIVE','First 50 Popular Songs You Should Play On Piano',208,'2024-07-28 09:00:15.095298',4,4,'Nếu bạn đã học một vài bài học piano và cảm thấy mình đã sẵn sàng vượt qua cuốn sách phương pháp và chơi những bài hát khiến bạn muốn học piano ngay từ đầu, thì First 50 Series của Hal Leonard là sự lựa chọn hoàn hảo cho bạn. ! Với những bài hát có lời bài hát phải biết, được sắp xếp đơn giản, những cuốn sách này sẽ giúp bạn tự tin bắt đầu xây dựng thư viện tiết mục của mình. Những bài hát nổi tiếng đầu tiên bạn nên chơi trên đàn piano bao gồm các bản hit nhạc pop, tiêu chuẩn nhạc jazz, các bài hát được yêu thích ở sân khấu Broadway và hơn thế nữa! Các bài hát bao gồm: Lá mùa thu * Ngọn nến trong gió * Đôi đũa * Không biết tại sao * Good Riddance (Time of Your Life) * Hallelujah * Happy * Happy Birthday to You * Heart and Soul * Hotel California * I Walk the Line * Just Con đường của bạn * Hãy để nó xảy ra * Hãy để nó đi * Bài hát của bạn * Dòng sông trăng * Qua cầu vồng * Người đàn piano * Đứng bên tôi * Mùa hè * Giai điệu không bị ràng buộc * Thật là một thế giới tuyệt vời * Ngày hôm qua * và hơn thế nữa. Xây dựng sự tự tin của bạn và tận hưởng niềm vui bên cây đàn piano với âm nhạc bạn yêu thích!');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_author`
--

DROP TABLE IF EXISTS `book_author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_author` (
  `book_id` int NOT NULL,
  `author_id` int NOT NULL,
  PRIMARY KEY (`book_id`,`author_id`),
  KEY `FKbjqhp85wjv8vpr0beygh6jsgo` (`author_id`),
  CONSTRAINT `FKbjqhp85wjv8vpr0beygh6jsgo` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`),
  CONSTRAINT `FKhwgu59n9o80xv75plf9ggj7xn` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_author`
--

LOCK TABLES `book_author` WRITE;
/*!40000 ALTER TABLE `book_author` DISABLE KEYS */;
INSERT INTO `book_author` VALUES (38,1),(38,2),(29,4),(29,5),(30,6),(31,7),(32,7),(34,9),(36,10),(37,10),(35,11),(39,15),(39,16),(40,19),(41,20),(42,22),(44,23);
/*!40000 ALTER TABLE `book_author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_category`
--

DROP TABLE IF EXISTS `book_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_category` (
  `book_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`book_id`,`category_id`),
  KEY `FKam8llderp40mvbbwceqpu6l2s` (`category_id`),
  CONSTRAINT `FKam8llderp40mvbbwceqpu6l2s` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FKnyegcbpvce2mnmg26h0i856fd` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_category`
--

LOCK TABLES `book_category` WRITE;
/*!40000 ALTER TABLE `book_category` DISABLE KEYS */;
INSERT INTO `book_category` VALUES (36,8),(41,8),(42,8),(29,10),(30,10),(37,10),(38,10),(39,10),(40,10),(31,11),(32,11),(44,11),(34,12),(35,14);
/*!40000 ALTER TABLE `book_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_copy`
--

DROP TABLE IF EXISTS `book_copy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_copy` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bar_code` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `status` enum('ACTIVE','AVAILABLE','BORROWED','DAMAGED','INACTIVE','LOST','OUT_OF_STOCK','PENDING','REJECT','RETURNED','RETURNING') DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKq8bucs9fxg4fyc077ym5w4i0j` (`bar_code`),
  KEY `FKpqftp65hd66ae8wsx7pp2cxcs` (`book_id`),
  KEY `FKadf0pf31ajyukt61i3bvjm0qd` (`created_by`),
  KEY `FKj1jdg0xgqi0ekajnc3eurjmg1` (`updated_by`),
  CONSTRAINT `FKadf0pf31ajyukt61i3bvjm0qd` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`),
  CONSTRAINT `FKj1jdg0xgqi0ekajnc3eurjmg1` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`),
  CONSTRAINT `FKpqftp65hd66ae8wsx7pp2cxcs` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_copy`
--

LOCK TABLES `book_copy` WRITE;
/*!40000 ALTER TABLE `book_copy` DISABLE KEYS */;
INSERT INTO `book_copy` VALUES (30,'BC67456','2024-07-21 19:39:50.862811',9,'RETURNED','2024-07-21 19:56:21.348442',9,35,9),(31,'BC88441','2024-07-21 19:42:00.497130',13,'PENDING','2024-07-21 19:42:00.497130',13,35,13),(32,'BC67440','2024-07-21 19:43:36.332145',9,'RETURNING','2024-07-23 08:45:58.674518',9,35,9),(33,'BC67881','2024-07-21 19:43:46.279556',9,'REJECT','2024-07-21 19:45:10.587690',9,35,9),(34,'BC92140','2024-07-21 19:45:29.570520',9,'ACTIVE','2024-07-23 12:41:51.364953',9,30,9),(35,'BC76231','2024-07-23 08:46:22.013828',9,'PENDING','2024-07-23 08:46:22.013828',9,37,9),(36,'BC66200','2024-07-28 08:11:59.311514',9,'REJECT','2024-07-28 08:13:04.290318',9,39,9),(37,'BC95240','2024-07-28 08:13:43.565916',9,'RETURNED','2024-07-28 08:14:09.221235',9,41,9),(38,'BC23665','2024-07-28 08:32:36.147677',18,'REJECT','2024-07-28 08:33:00.877954',18,39,18),(39,'BC19252','2024-07-28 08:33:15.993584',18,'RETURNED','2024-07-28 08:33:44.868863',18,41,18),(40,'BC10974','2024-07-28 09:33:36.038758',9,'RETURNED','2024-07-28 09:37:47.671470',9,36,9);
/*!40000 ALTER TABLE `book_copy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `parent_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4gee1gl2pvbutkm3b6l32mxg6` (`created_by`),
  KEY `FKjho6rkc8456ho2u9myv172can` (`updated_by`),
  KEY `FK2y94svpmqttx80mshyny85wqr` (`parent_id`),
  CONSTRAINT `FK2y94svpmqttx80mshyny85wqr` FOREIGN KEY (`parent_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FK4gee1gl2pvbutkm3b6l32mxg6` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`),
  CONSTRAINT `FKjho6rkc8456ho2u9myv172can` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (6,'2024-07-05 01:15:14.952249','Máy tính & Công nghệ','2024-07-05 01:15:14.952249',4,4,NULL),(8,'2024-07-05 01:25:55.520292','Khoa học máy tính','2024-07-05 02:15:33.501688',4,4,6),(9,'2024-07-05 01:44:57.877467','Nghệ thuật & Nhiếp ảnh','2024-07-05 01:44:57.877467',4,4,NULL),(10,'2024-07-05 02:14:27.567439','Lập trình','2024-07-05 02:19:08.166791',4,4,6),(11,'2024-07-06 15:32:57.267624','Âm nhạc','2024-07-06 15:32:57.267624',4,4,9),(12,'2024-07-06 18:59:18.718113','Lịch sử & Phê bình','2024-07-06 18:59:18.718113',4,4,9),(13,'2024-07-09 15:53:15.753440','Chính trị & Khoa học xã hội','2024-07-09 15:53:15.753440',4,4,NULL),(14,'2024-07-09 15:53:34.649365','Chính trị & Chính phủ','2024-07-09 15:53:34.649365',4,4,13);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan`
--

DROP TABLE IF EXISTS `loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `borrow_at` datetime(6) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `due_date` datetime(6) DEFAULT NULL,
  `note` text,
  `price` double NOT NULL,
  `return_at` datetime(6) DEFAULT NULL,
  `status` enum('ACTIVE','DAMAGED','LOST','OVERDUE','PENDING','REJECT','RENEWED','RETURNED','RETURNING') DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `book_copy_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhq4lfr6shkjcbqvn0if6sqtwf` (`book_copy_id`),
  KEY `FKxxm1yc1xty3qn1pthgj8ac4f` (`user_id`),
  CONSTRAINT `FKhq4lfr6shkjcbqvn0if6sqtwf` FOREIGN KEY (`book_copy_id`) REFERENCES `book_copy` (`id`),
  CONSTRAINT `FKxxm1yc1xty3qn1pthgj8ac4f` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan`
--

LOCK TABLES `loan` WRITE;
/*!40000 ALTER TABLE `loan` DISABLE KEYS */;
INSERT INTO `loan` VALUES (2,'2024-07-21 00:00:00.000000','2024-07-21 19:39:50.868798','2024-07-28 00:00:00.000000','',40000,'2024-07-21 00:00:00.000000','RETURNED','2024-07-21 19:56:21.353436',30,9),(3,'2024-07-21 00:00:00.000000','2024-07-21 19:42:00.501132','2024-07-28 00:00:00.000000','',40000,'2024-07-21 00:00:00.000000','PENDING','2024-07-21 19:42:00.501132',31,13),(4,'2024-07-21 00:00:00.000000','2024-07-21 19:43:36.337324','2024-07-28 00:00:00.000000','',40000,'2024-07-21 00:00:00.000000','RETURNING','2024-07-23 08:45:58.687637',32,9),(5,'2024-07-21 00:00:00.000000','2024-07-21 19:43:46.284557','2024-07-28 00:00:00.000000','Thư viện đang bảo trì',40000,'2024-07-21 00:00:00.000000','REJECT','2024-07-21 19:45:10.592695',33,9),(6,'2024-07-21 00:00:00.000000','2024-07-21 19:45:29.576659','2024-07-28 00:00:00.000000','',69000,'2024-07-21 00:00:00.000000','ACTIVE','2024-07-23 12:41:51.380699',34,9),(7,'2024-07-23 00:00:00.000000','2024-07-23 08:46:22.022827','2024-07-30 00:00:00.000000','',50000,'2024-07-23 00:00:00.000000','PENDING','2024-07-23 08:46:22.022827',35,9),(8,'2024-07-28 00:00:00.000000','2024-07-28 08:11:59.349146','2024-08-04 00:00:00.000000','Sách này hiện đang không thể mượn được',40000,'2024-07-28 00:00:00.000000','REJECT','2024-07-28 08:13:04.304902',36,9),(9,'2024-07-28 00:00:00.000000','2024-07-28 08:13:43.571903','2024-08-04 00:00:00.000000','',50000,'2024-07-28 00:00:00.000000','RETURNED','2024-07-28 08:14:09.227271',37,9),(10,'2024-07-28 00:00:00.000000','2024-07-28 08:32:36.151683','2024-08-07 00:00:00.000000','Việt xấu trai nên không cho mượn',40000,'2024-07-31 00:00:00.000000','REJECT','2024-07-28 08:33:00.883523',38,18),(11,'2024-07-28 00:00:00.000000','2024-07-28 08:33:16.000162','2024-08-04 00:00:00.000000','',50000,'2024-07-28 00:00:00.000000','RETURNED','2024-07-28 08:33:44.873862',39,18),(12,'2024-07-28 00:00:00.000000','2024-07-28 09:33:36.042758','2024-08-05 00:00:00.000000','Ngay mai, luc 5h',50000,'2024-07-29 00:00:00.000000','RETURNED','2024-07-28 09:37:47.676461',40,9);
/*!40000 ALTER TABLE `loan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_benefit`
--

DROP TABLE IF EXISTS `member_benefit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_benefit` (
  `benefit_id` int NOT NULL,
  `member_id` int NOT NULL,
  PRIMARY KEY (`benefit_id`,`member_id`),
  KEY `FKiqmbgluhpoamnk9pv897i7md` (`member_id`),
  CONSTRAINT `FKg8757vshak60o3nai6nilnhge` FOREIGN KEY (`benefit_id`) REFERENCES `benefits` (`id`),
  CONSTRAINT `FKiqmbgluhpoamnk9pv897i7md` FOREIGN KEY (`member_id`) REFERENCES `member_subscription` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_benefit`
--

LOCK TABLES `member_benefit` WRITE;
/*!40000 ALTER TABLE `member_benefit` DISABLE KEYS */;
INSERT INTO `member_benefit` VALUES (1,1),(2,2);
/*!40000 ALTER TABLE `member_benefit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_subscription`
--

DROP TABLE IF EXISTS `member_subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_subscription` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `expire_date` int DEFAULT NULL,
  `fee_member` double DEFAULT NULL,
  `is_deleted` bit(1) NOT NULL,
  `max_book` int NOT NULL,
  `name_subscription` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKobknjemi425wno3cs79lav76g` (`user_id`),
  KEY `FK5jpwu6a3adqebekouebq5gwvt` (`updated_by`),
  CONSTRAINT `FK5jpwu6a3adqebekouebq5gwvt` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`),
  CONSTRAINT `FKobknjemi425wno3cs79lav76g` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_subscription`
--

LOCK TABLES `member_subscription` WRITE;
/*!40000 ALTER TABLE `member_subscription` DISABLE KEYS */;
INSERT INTO `member_subscription` VALUES (1,'2024-07-19 14:50:08.615941',1,150000,_binary '\0',3,'Gói thành viên 1 tháng',4,NULL),(2,'2024-07-19 15:33:41.278065',3,250000,_binary '\0',3,'Gói thành viên 3 tháng',4,NULL);
/*!40000 ALTER TABLE `member_subscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` double DEFAULT NULL,
  `checksum` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `process` enum('DONE','INPROCESS') DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `member_subscription_id` int DEFAULT NULL,
  `payment` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK13b9opq1w4d0xkmk60yu439d7` (`payment`),
  KEY `FK19yb34phy3mdfj46qhivl50nk` (`member_subscription_id`),
  KEY `FKel9kyl84ego2otj2accfd8mr7` (`user_id`),
  CONSTRAINT `FK19yb34phy3mdfj46qhivl50nk` FOREIGN KEY (`member_subscription_id`) REFERENCES `member_subscription` (`id`),
  CONSTRAINT `FKel9kyl84ego2otj2accfd8mr7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKollpf727aq6g58cl8wve5lhxb` FOREIGN KEY (`payment`) REFERENCES `payment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (2,150000,NULL,'2024-07-21 19:34:33.404935','INPROCESS',_binary '\0','ACTIVE',1,NULL,13),(3,150000,NULL,'2024-07-21 19:38:29.903736','INPROCESS',_binary '\0','ACTIVE',1,NULL,9);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otp`
--

DROP TABLE IF EXISTS `otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `expiration_time` datetime(6) DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp`
--

LOCK TABLES `otp` WRITE;
/*!40000 ALTER TABLE `otp` DISABLE KEYS */;
INSERT INTO `otp` VALUES (17,'2024-07-16 15:57:25.447000','boobuj@mail1s.com','2024-07-16 15:58:25.446968','935947','2024-07-16 15:57:25.447000'),(34,'2024-07-16 21:02:13.915000','jayajat792@sablecc.com','2024-07-16 21:03:13.912886','425408','2024-07-16 21:02:13.915000'),(35,'2024-07-18 08:51:06.290000','jopiwa5788@stikezz.com','2024-07-18 08:52:06.289920','954077','2024-07-18 08:51:06.290000'),(40,'2024-07-23 01:33:43.971000','ndien9203@gmail.com','2024-07-23 01:34:43.968785','898622','2024-07-23 01:33:43.971000'),(47,'2024-07-28 08:23:05.217000','hphucxma2004@gmail.com','2024-07-28 08:24:05.217913','107631','2024-07-28 08:23:05.217000');
/*!40000 ALTER TABLE `otp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` double DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `status_payment` enum('FAIL','PENDING','SUCCESS') DEFAULT NULL,
  `payment_gateway` enum('MOMO','PAYPAL','VN_PAY') DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `member_subscription_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKk0a2ho8qr030swkgntigdekdn` (`member_subscription_id`),
  KEY `FK4spfnm9si9dowsatcqs5or42i` (`user_id`),
  CONSTRAINT `FK4spfnm9si9dowsatcqs5or42i` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKbj57jslchxx14l0u48tix4w9b` FOREIGN KEY (`member_subscription_id`) REFERENCES `member_subscription` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `feedback` varchar(255) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK70yrt09r4r54tcgkrwbeqenbs` (`book_id`),
  KEY `FKuldpqt6am6kr836rn7ghcgtu` (`member_id`),
  CONSTRAINT `FK70yrt09r4r54tcgkrwbeqenbs` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`),
  CONSTRAINT `FKuldpqt6am6kr836rn7ghcgtu` FOREIGN KEY (`member_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (6,'2024-07-18 08:48:45.004658','Sách hayyyyy',5,'2024-07-18 09:05:51.181134',35,13),(7,'2024-07-18 09:06:04.640843','Good',5,'2024-07-18 09:06:04.640843',35,13),(8,'2024-07-18 09:07:52.543180','Excellent',5,'2024-07-18 09:07:52.543180',35,9),(9,'2024-07-18 10:40:50.001073','Sách này hay',5,'2024-07-18 10:40:50.001073',35,9),(10,'2024-07-22 14:35:25.111743','',4,'2024-07-22 14:35:25.111743',35,9),(12,'2024-07-22 21:21:30.090033','Cuốn sách này rất ý nghĩa',5,'2024-07-22 21:21:30.090033',35,9);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sample_book`
--

DROP TABLE IF EXISTS `sample_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sample_book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `sample_book_image` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKr77q5tp962yk8tpdlhmhmtahk` (`book_id`),
  CONSTRAINT `FKr77q5tp962yk8tpdlhmhmtahk` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sample_book`
--

LOCK TABLES `sample_book` WRITE;
/*!40000 ALTER TABLE `sample_book` DISABLE KEYS */;
INSERT INTO `sample_book` VALUES (52,'2024-07-07 08:07:41.674343','1720314461670.jpg','2024-07-07 08:07:41.674343',34),(53,'2024-07-07 08:07:41.676336','1720314461671.jpg','2024-07-07 08:07:41.676336',34),(54,'2024-07-07 08:09:35.357141','1720314575354.png','2024-07-07 08:09:35.357141',32),(55,'2024-07-07 08:09:35.359141','1720314575355.jpg','2024-07-07 08:09:35.359141',32),(63,'2024-07-08 01:41:49.433848','1720377709426.jpg','2024-07-08 01:41:49.433848',30),(64,'2024-07-08 01:41:49.452011','1720377709428.jpg','2024-07-08 01:41:49.452011',30),(65,'2024-07-08 01:42:09.689150','1720377729686.jpg','2024-07-08 01:42:09.689150',31),(66,'2024-07-08 01:42:09.692121','1720377729685.png','2024-07-08 01:42:09.692121',31),(67,'2024-07-09 16:02:59.676124','1720515779674.jpg','2024-07-09 16:02:59.676124',35),(68,'2024-07-09 16:02:59.679135','1720515779673.jpg','2024-07-09 16:02:59.679135',35),(69,'2024-07-10 21:01:23.560768','1720620083557.jpg','2024-07-10 21:01:23.560768',36),(70,'2024-07-10 21:01:23.562774','1720620083558.jpg','2024-07-10 21:01:23.562774',36),(71,'2024-07-11 08:53:01.036135','1720662781033.jpg','2024-07-11 08:53:01.036135',37),(72,'2024-07-11 08:53:01.038135','1720662781032.jpg','2024-07-11 08:53:01.038135',37),(79,'2024-07-22 22:52:37.216131','1721663557212.jpg','2024-07-22 22:52:37.216131',29),(80,'2024-07-22 22:52:37.218132','1721663557211.jpg','2024-07-22 22:52:37.218132',29),(87,'2024-07-22 23:22:53.215236','1721665373213.png','2024-07-22 23:22:53.215236',38),(88,'2024-07-22 23:22:53.217170','1721665373210.png','2024-07-22 23:22:53.217170',38),(89,'2024-07-22 23:22:53.219179','1721665373208.jpg','2024-07-22 23:22:53.219179',38),(95,'2024-07-27 20:46:12.779900','1722087972777.png','2024-07-27 20:46:12.779900',39),(96,'2024-07-27 20:46:12.781893','1722087972776.jpg','2024-07-27 20:46:12.781893',39),(99,'2024-07-27 22:34:50.726440','1722094490722.jpg','2024-07-27 22:34:50.726440',40),(100,'2024-07-27 22:34:50.742596','1722094490723.jpg','2024-07-27 22:34:50.742596',40),(101,'2024-07-28 02:35:54.521047','1722108954520.jpg','2024-07-28 02:35:54.521047',41),(102,'2024-07-28 02:35:54.523849','1722108954519.jpg','2024-07-28 02:35:54.523849',41),(103,'2024-07-28 02:35:54.524848','1722108954515.jpg','2024-07-28 02:35:54.524848',41),(104,'2024-07-28 02:35:54.525849','1722108954517.png','2024-07-28 02:35:54.525849',41),(105,'2024-07-28 02:35:54.526849','1722108954518.png','2024-07-28 02:35:54.526849',41),(106,'2024-07-28 08:39:21.735933','1722130761732.jpg','2024-07-28 08:39:21.735933',42),(107,'2024-07-28 08:39:21.738926','1722130761733.jpg','2024-07-28 08:39:21.738926',42),(108,'2024-07-28 08:39:21.739934','1722130761730.jpg','2024-07-28 08:39:21.739934',42),(109,'2024-07-28 08:39:21.740938','1722130761731.jpg','2024-07-28 08:39:21.740938',42),(111,'2024-07-28 09:00:15.114340','1722132015111.jpg','2024-07-28 09:00:15.114340',44);
/*!40000 ALTER TABLE `sample_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','LIBRARIAN','MEMBER') DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `verified` bit(1) DEFAULT NULL,
  `member_subscription_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3qy291j8kqb4uqmodb7kykrxo` (`member_subscription_id`),
  CONSTRAINT `FK3qy291j8kqb4uqmodb7kykrxo` FOREIGN KEY (`member_subscription_id`) REFERENCES `member_subscription` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2024-06-19 15:12:00.514000','diennvhe171038@fpt.edu.vn','Nguyễn Văn Diên','$2a$10$MacnrCzLlin67vtwnhdkPuq0Es4/HHciUmQgBVxCYBI7bpykntWN.',NULL,'ADMIN','ACTIVE','2024-07-22 21:25:29.244000',_binary '',NULL),(4,'2024-06-19 22:33:40.917000','hphuca12004@gmail.com','Phuc Nguyen','$2a$10$PaY.yBvnkaCphQ1/PCCqtuBIY5TtKQ9bdSI4cergPNmnzcnhgsCtm','0283549325','LIBRARIAN','ACTIVE','2024-06-20 08:52:03.682000',_binary '',NULL),(9,'2024-07-16 16:12:25.861000','ndien9203@gmail.com','Nguyen Dien','$2a$10$amlwsUuWKHYygbD7ONOP4.q6uPvYkbWerBjmTkVs8ZDHGkhtrTUre','0381234563','MEMBER','ACTIVE','2024-07-22 00:30:46.752000',_binary '',1),(13,'2024-07-16 20:52:26.201000','jayajat792@sablecc.com','Nguyen Van Dien','$2a$10$gSoCRoHhD/15wS3wTfbupeS0w/8GNa6YEv2SaE1FxK/aAEmAFh/ue',NULL,'MEMBER','ACTIVE','2024-07-21 19:34:33.411000',_binary '',1),(15,'2024-07-16 21:47:29.748000','jopiwa5788@stikezz.com','Nguyen Hoang Phuc','$2a$10$vlQJLG887fuDavku9VGiNu/1OywkoDS4d6R5niTaCMQv1.yyoetye','0388089415','MEMBER','ACTIVE','2024-07-16 22:04:38.873000',_binary '\0',NULL),(16,'2024-07-19 08:01:37.182000','hphucxma24@gmail.com','Phuc','$2a$10$pCDuWNgU41MO9HT1f7w10emc8U4nmLBQEr9C1cpsHW3JQdEkDACRu','0983963834','MEMBER','ACTIVE','2024-07-19 08:01:37.182000',_binary '\0',NULL),(17,'2024-07-19 08:11:45.394000','vietnhhe181045@fpt.edu.vn','Viet đang có người yêu','$2a$10$J/18/MgUkvDIQqWS7GQsoew8rD5UUzebLc.Do5NEq8v0H7mxATKYu','0878196892','MEMBER','ACTIVE','2024-07-21 09:26:04.821000',_binary '\0',NULL),(18,'2024-07-28 08:17:58.047000','hphucxma2004@gmail.com','Viet Le','$2a$10$ULxV8jTmpMERA670CR2rvOeseZfy1DCGUS/6ybrJbFEl8ax7zJq/W',NULL,'MEMBER','ACTIVE','2024-07-28 08:17:58.047000',_binary '',2),(19,'2024-07-28 09:29:54.275000','vithehe3009@gmail.com','Le Van Viet','$2a$10$t1BGsSHrpOJzKqLPB8SKCeZVCGvW9RoPet5Uj4EHhFjHgZrB/4haO',NULL,'MEMBER','ACTIVE','2024-07-28 09:29:54.275000',_binary '\0',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-30 13:31:15
