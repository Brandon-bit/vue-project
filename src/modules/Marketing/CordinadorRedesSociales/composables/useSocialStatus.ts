// src/modules/Marketing/CordinadorRedesSociales/composables/useSocialStatus.ts

import type { SocialPost } from '../types/socialPostTypes';

type Status = SocialPost['status'];

interface BadgeProps {
  class: string;
  label: string;
}

/**
 * Proporciona propiedades de estilo para los badges de estado de las publicaciones.
 */
export const useStatusBadge = () => {
  const getBadgeProps = (status: Status): BadgeProps => {
    switch (status) {
      case 'published':
        return { class: 'badge-success text-white', label: 'Publicado' };
      case 'archived':
        return { class: 'badge-ghost', label: 'Archivado' };
      case 'draft':
      default:
        return { class: 'badge-warning', label: 'Borrador' };
    }
  };

  return { getBadgeProps };
};