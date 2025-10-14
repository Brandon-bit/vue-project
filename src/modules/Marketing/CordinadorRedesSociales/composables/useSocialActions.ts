// src/modules/SocialPosts/composables/useSocialPostActions.ts

import type { SocialPost, SocialPostFormType } from '../types/socialPostTypes'
import useSocialStore from '@/modules/Marketing/CordinadorRedesSociales/store/useSocialPostStore'

import { createPostService, deletePostService, updatePostService, getPostsService } from '../services/socialPostService'


//separar mapper

const mapPostRequest = (data: SocialPostFormType): FormData => {
    const formData = new FormData();
   
    formData.append('date', data.date);
    formData.append('caption', data.caption || '');
    if (data.image) {
        formData.append('image', data.image);
    }
    formData.append('status', data.status);
    formData.append('networks.facebook', data['networks.facebook'] ? 'true' : 'false');
    formData.append('networks.instagram', data['networks.instagram'] ? 'true' : 'false');
    formData.append('networks.twitter', data['networks.twitter'] ? 'true' : 'false');



    return formData;
}


export const useSocialPostActions = () => {
    
    const socialStore = useSocialStore()

    const getPosts = async (page: number, pageSize: number): Promise<{ items: SocialPost[], total: number }> => {
       
        const response = await getPostsService(page, pageSize)
        return {
            items: response.data.items, 
            total: response.data.totalItems
        }
    }

    const createPost = async (data: SocialPostFormType) => {
        const model = mapPostRequest(data)
        const response = await createPostService(model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
        }
    }

    const editPost = async (data: SocialPostFormType) => {
        const model = mapPostRequest(data)
        const id = socialStore.selectedPost.id ?? ''
        const response = await updatePostService(id, model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
        }
    }

    const deletePost = async () => {
        const id = socialStore.selectedPost?.id ?? ''
        const response = await deletePostService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
        }
    }

    return { createPost, editPost, deletePost, getPosts }
}