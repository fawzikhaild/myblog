
import { toast } from "react-hot-toast";

function Icon({ type }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (type === "success") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16 9" />
      </svg>
    );
  }

  if (type === "edit") {
    return (
      <svg {...common}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </svg>
    );
  }

  if (type === "delete") {
    return (
      <svg {...common}>
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v5" />
        <path d="M14 11v5" />
      </svg>
    );
  }

  if (type === "warning" || type === "error") {
    return (
      <svg {...common}>
        <path d="M10.3 3.5 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.5a2 2 0 0 0-3.4 0Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    );
  }

  if (type === "lock") {
    return (
      <svg {...common}>
        <rect
          x="5"
          y="10"
          width="14"
          height="10"
          rx="2"
        />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}

const config = {
  success: {
    title: "تمت العملية بنجاح",
    color: "#16A34A",
    bg: "#F0FDF4",
  },

  edit: {
    title: "تم تعديل المقال",
    color: "#2563EB",
    bg: "#EFF6FF",
  },

  delete: {
    title: "تم حذف المقال",
    color: "#DC2626",
    bg: "#FEF2F2",
  },

  warning: {
    title: "تنبيه",
    color: "#D97706",
    bg: "#FFFBEB",
  },

  error: {
    title: "حدث خطأ",
    color: "#DC2626",
    bg: "#FEF2F2",
  },

  lock: {
    title: "غير مسموح",
    color: "#7C3AED",
    bg: "#F5F3FF",
  },

  info: {
    title: "معلومة",
    color: "#0284C7",
    bg: "#F0F9FF",
  },
};

export function showAppToast({
  type = "info",
  title,
  message,
}) {
  const current =
    config[type] || config.info;

  toast.custom(
    (t) => (
      <div
        style={{
          minWidth: "340px",
          maxWidth: "420px",
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          padding: "15px 17px",
          borderRadius: "14px",
          background: current.bg,
          border: `1px solid ${current.color}25`,
          boxShadow:
            "0 10px 30px rgba(15, 23, 42, 0.12)",
          opacity: t.visible ? 1 : 0,
          transform: t.visible
            ? "translateY(0)"
            : "translateY(-10px)",
          transition: "all 0.2s ease",
        }}
      >
        <div
          style={{
            width: "38px",
            height: "38px",
            minWidth: "38px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: current.color,
            background: `${current.color}15`,
          }}
        >
          <Icon type={type} />
        </div>

        <div
          style={{
            flex: 1,
            direction: "rtl",
            textAlign: "right",
          }}
        >
          <div
            style={{
              fontSize: "15px",
              fontWeight: 800,
              color: "#0F172A",
              marginBottom: "4px",
            }}
          >
            {title || current.title}
          </div>

          {message && (
            <div
              style={{
                fontSize: "13px",
                lineHeight: 1.6,
                color: "#64748B",
              }}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    ),
    {
      duration: 3500,
    }
  );
}

