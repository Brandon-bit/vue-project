import BaseModal from './BaseModal';
import AddEditForm from './modals/AddEditForm';
import DeleteProduct from './modals/DeleteProduct';
import ProductDetail from './modals/ProductDetail';

const ModalManager = () => {
  const typeModal = useProductModalStore(state => state.typeModal);
  const isOpenModal = useProductModalStore(state => state.isOpenModal);
  const modalData = useProductModalStore(state => state.modalData);
  const closeModal = () => useProductModalStore.getState().openModal(false);

  const modalMap = {
    ADD: {
      title: 'Añadir producto',
      Component: AddEditForm,
      showFooter: true,
    },
    EDIT: {
      title: 'Editar producto',
      Component: AddEditForm,
      showFooter: true,
    },
    DELETE: {
      title: 'Eliminar producto',
      Component: DeleteProduct,
      showFooter: true,
    },
    DETAIL: {
      title: 'Detalle del producto',
      Component: ProductDetail,
      showFooter: false,
    },
  };

  const config = modalMap[typeModal] || {};
  const { title, Component, showFooter } = config;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manejo de lógica aquí, o pasarlo como prop
  };

  return (
    <BaseModal
      title={title}
      onSubmit={handleSubmit}
      isLoading={false}
      show={isOpenModal}
      onHide={closeModal}
      showFooter={showFooter}
    >
      {Component ? <Component data={modalData} /> : null}
    </BaseModal>
  );
};
