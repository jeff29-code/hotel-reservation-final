import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "573112534475"; 
  const message = "Hola! Tengo una consulta sobre un hotel 😊";
  //const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        backgroundColor: "#25D366",
        color: "white",
        borderRadius: "50%",
        padding: "15px",
        fontSize: "24px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <FaWhatsapp />
    </a>
  );
};

export default WhatsAppButton;