import axiosInterceptor from "@/utils/axiosInterceptor";
import {config} from "@/constants/url";
import {ReplyInputType} from "@/constants/Replies";

export const replyService = {
    adminReplyReview: async (value: ReplyInputType) => {
        try {
            const {data} = await axiosInterceptor.post(config.endpoints.replies.reviewReplies, value);
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getReplyDetail: async (replyId: number) => {
        try {
            const {data} = await axiosInterceptor.get(config.endpoints.replies.crudReply + replyId);
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    updateReply: async (replyId: number, value: ReplyInputType) => {
        try {
            const {data} = await axiosInterceptor.put(config.endpoints.replies.crudReply + replyId, value);
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    deleteReply: async (replyId: number) => {
        try {
            const {data} = await axiosInterceptor.delete(config.endpoints.replies.crudReply + replyId);
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getReviewReplies: async () => {
        try {
            const {data} = await axiosInterceptor.get(config.endpoints.replies.reviewReplies, {
                params: {}
            });
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}