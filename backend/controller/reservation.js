import ErrorHandler from '../error/error.js';
import { Reservation } from '../models/reservationSchema.js';

export const sendReservation = async (req, res, next) => {
    const { firstName, lastName, email, phone, date, time } = req.body;

    // Kiểm tra xem tất cả các trường đã được điền đầy đủ hay không
    if (!firstName || !lastName || !email || !phone || !date || !time) {
        return next(new ErrorHandler("Please fill full reservation form!", 400));
    }

    try {
        // Sửa chỗ này: Truyền một đối tượng duy nhất cho Reservation.create
        await Reservation.create({
            firstName,
            lastName,
            email,
            phone,
            date,
            time
        });

        res.status(201).json({
            success: true,
            message: "Reservation sent successfully",
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            return next(new ErrorHandler(validationErrors.join(", "), 400));
        }
        return next(error);
    }
};

export default sendReservation;
