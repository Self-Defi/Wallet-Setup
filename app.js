(() => {
  const CID = "bafybeicnto2jhyryfoe6uaes22tm5pyrlza7665hrjq73hv7prdhkmuqfu";
  const GATEWAY = `https://dweb.link/ipfs/${CID}`;

  const toastEl = document.getElementById("toast");
  const btnCopyCID = document.getElementById("btnCopyCID");
  const btnCopyLink = document.getElementById("btnCopyLink");
  const cidText = document.getElementById("cidText");
  const gatewayLink = document.getElementById("gatewayLink");

  if (cidText) cidText.textContent = CID;

  if (gatewayLink) {
    gatewayLink.href = GATEWAY;
    gatewayLink.textContent = `https://dweb.link/ipfs/…/${CID.slice(-10)}`;
  }

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => toastEl.classList.remove("show"), 1300);
  }

  async function copy(text, okMsg) {
    try {
      await navigator.clipboard.writeText(text);
      showToast(okMsg);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      showToast(okMsg);
    }
  }

  btnCopyCID?.addEventListener("click", () => copy(CID, "CID copied"));
  btnCopyLink?.addEventListener("click", () => copy(GATEWAY, "Link copied"));
})();
