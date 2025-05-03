import { createSignal, onMount, onCleanup } from 'solid-js'; // Import lifecycle hooks
import Modal from './Modal';
import ContactForm from './ContactForm';

const ContactModalTrigger = (props) => {
  const [isModalOpen, setIsModalOpen] = createSignal(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Listen for the custom event from the Navbar
  const handleOpenEvent = () => {
    openModal();
  };

  onMount(() => {
    window.addEventListener('open-contact-modal', handleOpenEvent);
    onCleanup(() => {
      window.removeEventListener('open-contact-modal', handleOpenEvent);
    });
  });

  return (
    <>
      {/* Render the trigger element passed as children */}
      <div onClick={openModal} class="inline-block cursor-pointer">
        {props.children}
      </div>

      {/* Render the Modal */}
      <Modal isOpen={isModalOpen()} onClose={closeModal}>
        <ContactForm />
      </Modal>
    </>
  );
};

export default ContactModalTrigger;
