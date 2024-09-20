const BookingDetailPage = ({ params }: { params: { bookingId: string } }) => {
    return (
        <div>
            Booking Detail Page {params.bookingId}
        </div>
    );
};

export default BookingDetailPage;