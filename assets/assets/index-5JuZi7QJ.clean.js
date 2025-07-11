
// Fractal Bitcoin Swap Platform - Clean ES5 Build
// Generated: 2025-07-11T19:02:23.017Z

(function() {
  'use strict';
  
  // Polyfills for ES5 compatibility
  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, thisArg) {
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }
  
  if (!Array.prototype.map) {
    Array.prototype.map = function(callback, thisArg) {
      var result = [];
      for (var i = 0; i < this.length; i++) {
        result.push(callback.call(thisArg, this[i], i, this));
      }
      return result;
    };
  }
  
  if (!Object.assign) {
    Object.assign = function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (source.hasOwnProperty(key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  }
  
  // Promise polyfill for ES5
  if (typeof Promise === 'undefined') {
    window.Promise = function(executor) {
      var self = this;
      self.state = 'pending';
      self.value = undefined;
      self.handlers = [];
      
      function resolve(result) {
        if (self.state === 'pending') {
          self.state = 'fulfilled';
          self.value = result;
          self.handlers.forEach(handle);
          self.handlers = null;
        }
      }
      
      function reject(error) {
        if (self.state === 'pending') {
          self.state = 'rejected';
          self.value = error;
          self.handlers.forEach(handle);
          self.handlers = null;
        }
      }
      
      function handle(handler) {
        if (self.state === 'pending') {
          self.handlers.push(handler);
        } else {
          if (self.state === 'fulfilled' && typeof handler.onFulfilled === 'function') {
            handler.onFulfilled(self.value);
          }
          if (self.state === 'rejected' && typeof handler.onRejected === 'function') {
            handler.onRejected(self.value);
          }
        }
      }
      
      this.then = function(onFulfilled, onRejected) {
        return new Promise(function(resolve, reject) {
          handle({
            onFulfilled: function(result) {
              try {
                resolve(onFulfilled ? onFulfilled(result) : result);
              } catch (ex) {
                reject(ex);
              }
            },
            onRejected: function(error) {
              try {
                resolve(onRejected ? onRejected(error) : error);
              } catch (ex) {
                reject(ex);
              }
            }
          });
        });
      };
      
      this.catch = function(onRejected) {
        return this.then(null, onRejected);
      };
      
      try {
        executor(resolve, reject);
      } catch (ex) {
        reject(ex);
      }
    };
  }
  
  // Fetch polyfill for ES5
  if (typeof fetch === 'undefined') {
    window.fetch = function(url, options) {
      return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(options && options.method || 'GET', url);
        
        if (options && options.headers) {
          for (var key in options.headers) {
            xhr.setRequestHeader(key, options.headers[key]);
          }
        }
        
        xhr.onload = function() {
          resolve({
            ok: xhr.status >= 200 && xhr.status < 300,
            status: xhr.status,
            statusText: xhr.statusText,
            json: function() {
              return Promise.resolve(JSON.parse(xhr.responseText));
            },
            text: function() {
              return Promise.resolve(xhr.responseText);
            }
          });
        };
        
        xhr.onerror = function() {
          reject(new Error('Network error'));
        };
        
        xhr.send(options && options.body || null);
      });
    };
  }
  
  // Basic application initialization
  function initializeApp() {
    console.log('Fractal Bitcoin Swap Platform - ES5 Compatible Version');
    console.log('Build Date: 2025-07-11T19:02:23.018Z');
    
    // Check for required browser features
    var requiredFeatures = [
      'JSON',
      'localStorage',
      'XMLHttpRequest'
    ];
    
    var missingFeatures = [];
    for (var i = 0; i < requiredFeatures.length; i++) {
      if (typeof window[requiredFeatures[i]] === 'undefined') {
        missingFeatures.push(requiredFeatures[i]);
      }
    }
    
    if (missingFeatures.length > 0) {
      console.error('Missing required browser features:', missingFeatures);
      return;
    }
    
    // Initialize theme
    var theme = localStorage.getItem('fractal-swap-theme') || 'light';
    document.documentElement.classList.add(theme);
    
    // Initialize wallet detection
    setTimeout(function() {
      detectWallets();
    }, 1000);
  }
  
  function detectWallets() {
    var wallets = [];
    
    if (typeof window.unisat !== 'undefined') {
      wallets.push({
        name: 'UniSat',
        installed: true,
        connector: window.unisat
      });
    }
    
    if (typeof window.okxwallet !== 'undefined') {
      wallets.push({
        name: 'OKX',
        installed: true,
        connector: window.okxwallet
      });
    }
    
    console.log('Detected wallets:', wallets.length);
    
    // Update UI to show available wallets
    updateWalletUI(wallets);
  }
  
  function updateWalletUI(wallets) {
    var connectButton = document.querySelector('.fractal-button');
    if (connectButton && wallets.length === 0) {
      connectButton.textContent = 'No Wallets Detected';
      connectButton.disabled = true;
    }
  }
  
  // Error handling
  window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('JavaScript Error:', {
      message: msg,
      source: url,
      line: lineNo,
      column: columnNo,
      error: error
    });
    return false;
  };
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
  } else {
    initializeApp();
  }
  
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {};
}
