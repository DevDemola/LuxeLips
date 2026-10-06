import { FiCheck } from "react-icons/fi";
import { useStore } from "../../store/context";
import "./Toast.css";

export default function Toast() {
  const { toast } = useStore();
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toast && (
        <div key={toast.id} className="toast">
          <FiCheck aria-hidden="true" />
          {toast.message}
        </div>
      )}
    </div>
  );
}
