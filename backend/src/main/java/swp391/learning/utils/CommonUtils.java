package swp391.learning.utils;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Random;
import java.util.UUID;

public class CommonUtils {
    private static Random random = new Random();

    public String getSessionId() {
        return UUID.randomUUID().toString();
    }

    public static Integer getSessionID() {
        return random.nextInt();
    }

    public static String getOTP() {
        return new DecimalFormat("000000").format(random.nextInt(999999));
    }

    public static LocalDateTime convertStringToLocalDateTime(String arg) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        try {
            LocalDate date = LocalDate.parse(arg, formatter);
            return date.atStartOfDay();
        } catch (DateTimeParseException e) {
            System.err.println("Invalid date format: " + e.getMessage());
        }
        return null;
    }

    public static LocalDateTime convertStringToLocalDateTimeAfter7Days(String dateTimeString) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        try {
            LocalDate date = LocalDate.parse(dateTimeString, formatter);
            return date.plusDays(7).atStartOfDay();
        } catch (DateTimeParseException e) {
            System.err.println("Invalid date format: " + e.getMessage());
        }
        return null;
    }
}
