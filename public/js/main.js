const editor = grapesjs.init({
  container: '#editor', 
  storageManager: false, 
  blockManager: {
    appendTo: '#blocks', 
  }, 
  storageManager: {
    type: 'remote', 
    stepsBeforeSave: 1, 
    autosave: true,  // Store data automatically
    // autoload: true, 
    contentTypeJson: true, 
    id: 'my-', 
    storeComponents: true, 
    storeStyles: true,  
    storeHtml: true,  
    storeCss: true,  
    urlStore: `/api/pages/${location.pathname.split('/')[2]}/content`,  
    urlLoad: `/api/pages/${location.pathname.split('/')[2]}/content`,  
    headers: { 
      'Content-Type': 'application/json', 
    }, 
    params: {},  // For custom values on requests
  }, 
  styleManager: {
    appendTo: '#styles-container', 
    sectors: [
      {
        name: 'Dimension', 
        open: false, 
        buildProps: ['width',  'min-height',  'padding'], 
        properties: [
          {
            type: 'integer', 
            name: 'The width', 
            property: 'width', 
            units: ['px',  '%'], 
            defaults: 'auto', 
            min: 0, 
          }, 
        ], 
      }, 
    ], 
  }, 
  layerManager: {
    appendTo: '#layers-container', 
  }, 
  traitManager: {
    appendTo: '#trait-container', 
  }, 
  selectorManager: {
    appendTo: '#styles-container', 
  }, 
  panels: {
    defaults: [
      {
        id: 'basic-actions', 
        el: '.panel__basic-actions', 
        buttons: [
          {
            id: 'visibility', 
            active: true,  // active by default
            className: 'btn-toggle-borders', 
            label: '<i class="fa fa-clone"></i>', 
            command: 'sw-visibility',  // Built-in command
          }, 
        ], 
      }, 
      {
        id: 'panel-devices', 
        el: '.panel__devices', 
        buttons: [
          {
            id: 'device-desktop', 
            label: '<i class="fa fa-television"></i>', 
            command: 'set-device-desktop', 
            active: true, 
            togglable: false, 
          }, 
          {
            id: 'device-mobile', 
            label: '<i class="fa fa-mobile"></i>', 
            command: 'set-device-mobile', 
            togglable: false, 
          }, 
        ], 
      }, 
    ], 
  }, 
  deviceManager: {
    devices: [
      {
        name: 'Desktop', 
        width: '', 
      }, 
      {
        name: 'Mobile', 
        width: '320px', 
        widthMedia: '480px', 
      }, 
    ], 
  }, 
  plugins: ['gjs-blocks-basic'], 
  pluginsOpts: {
    'gjs-blocks-basic': {}, 
  }, 
});
// Commands
editor.Commands.add('set-device-desktop',  {
  run: (editor) => editor.setDevice('Desktop'), 
});
editor.Commands.add('set-device-mobile',  {
  run: (editor) => editor.setDevice('Mobile'), 
});
editor.on('storage:load',  function (e) {
  console.log('Loaded ',  e);
});
editor.on('storage:store',  function (e) {
  console.log('Stored ',  e);
});
