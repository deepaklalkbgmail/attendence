
/* Global UX helpers */
(function(){
  const loader = document.getElementById('loader-overlay');
  function showLoader(){ if(loader) loader.classList.add('show'); }
  function hideLoader(){ if(loader) loader.classList.remove('show'); }
  window.AppLoader = { show: showLoader, hide: hideLoader };

  // attach loader to long-running forms
  document.querySelectorAll('form.js-loading-form').forEach(f=>{
    f.addEventListener('submit', ()=>{
      showLoader();
    });
  });

  // Select all checkboxes
  const sa = document.querySelector('[data-select-all]');
  if (sa){
    sa.addEventListener('change', e=>{
      const on = e.target.checked;
      document.querySelectorAll('input[name="ids"]').forEach(cb=> cb.checked = on);
    });
  }

  // Drag & drop for upload
  const drop = document.querySelector('.drop');
  const file = document.querySelector('input[type="file"][name="excel"]');
  if (drop && file){
    ;['dragenter','dragover'].forEach(evt=> drop.addEventListener(evt, e=>{ e.preventDefault(); e.stopPropagation(); drop.classList.add('drag'); }));
    ;['dragleave','drop'].forEach(evt=> drop.addEventListener(evt, e=>{ e.preventDefault(); e.stopPropagation(); drop.classList.remove('drag'); }));
    drop.addEventListener('drop', e=>{
      const dt = e.dataTransfer;
      if (dt && dt.files && dt.files.length){
        file.files = dt.files;
        drop.querySelector('.helper').textContent = dt.files[0].name;
      }
    });
  }

  // Toast
  const toast = document.querySelector('.toast');
  if (toast && toast.dataset.msg){
    toast.querySelector('.text').textContent = toast.dataset.msg;
    toast.classList.add('show');
    setTimeout(()=> toast.classList.remove('show'), 4500);
  }

  // Add loader to buttons that navigate
  document.querySelectorAll('[data-show-loader]').forEach(btn => {
    btn.addEventListener('click', () => AppLoader.show());
  });
})();
