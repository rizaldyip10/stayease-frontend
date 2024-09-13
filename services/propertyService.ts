import axiosInterceptor from "@/services/authService";

export const getRoomDetail = async (propertyId: number, roomId: number) => {
    try {
        const { data } = await axiosInterceptor.get(`/properties/${propertyId}/rooms/${roomId}`);
        return data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}