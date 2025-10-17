import { defineStore } from 'pinia'
import { SocialPost } from '../types/socialPostTypes'

const initialPost: SocialPost = {
  id: '',
  date: '',
  networks: {},
  status: 'draft',
  image: ''
}

const useSocialStore = defineStore('social-store', {
    state: () => ({
        selectedPost: initialPost as SocialPost,
        modalId: 'social-modal'
    }),
    actions: {
        setData(data: SocialPost = initialPost) {
            this.selectedPost = data
        }
    }
})

export default useSocialStore
