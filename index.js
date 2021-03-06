var myFolder = myFolder || {};
myFolder = (function(global) {
  // file elements
  var folderFile = document.getElementById("folderFile");
  var folderFileBefore = document.getElementById("folderFileBefore");
  var fileHeader = document.getElementById("fileHeader");
  var fileContainer = document.getElementById("fileContainer");
  // folder elements
  var folderHead = document.getElementById("folderHead");
  var folderCover = document.getElementById("folderCover");
  // file control button elements
  var uploadButton = document.getElementById("uploadButton");
  // windows control button elements
  var closeButton = document.getElementById("closeButton");


  var setClickHandler = function() {
    // file items handler
    var fileItems = document.getElementsByClassName("fileItem");
    for(var i = 0 ; i < fileItems.length ; i++) {
      fileItems[i].addEventListener("click", function() { focusFileItem(this);});
    }

    // upload button handler
    uploadButton.addEventListener("click", uploadFiles);

    // close button handler
    closeButton.addEventListener("click", closeWindow);
  }

  var uploadFiles = function() {
    var focusedFileArray = document.getElementsByClassName("focusedFile");
    for(var i = 0 ; i < focusedFileArray.length ; i++) {
      // the file has been already uploading
      if(focusedFileArray[i].lastElementChild.nodeName == "div") {
        continue;
      }
      // the file is going to be uploaded
      if(focusedFileArray[i].lastElementChild.nodeName == "svg") {
        // return the progressBar and appended in the file item
        var focusedFileProgressBar = createProgressBar(focusedFileArray[i], i);
        focusedFileArray[i].appendChild(focusedFileProgressBar);
        // choose uploading animation type randomly
        var progressBarAnimationType = Math.floor(Math.random() * 2) + 1;
        if(progressBarAnimationType == 1) {
          focusedFileProgressBar.firstElementChild.style.animation = "uploadAnimation1 0.5s linear forwards, uploadAnimation2 0.5s 0.5s linear forwards";
        }
        if(progressBarAnimationType == 2) {
          focusedFileProgressBar.firstElementChild.style.animation = "uploadAnimation1 0.5s linear forwards, uploadAnimation2 0.5s 1.5s linear forwards";
        }

        blurFileItem(focusedFileArray[i], i);
      }
    }
  };

  // show the successful icon when finish uploading
  var finishUploadingDisplay = function(path, e) {
    if(e.animationName == "uploadAnimation2") {
      path.style.visibility = "visible";
    }
  };

  var createProgressBar = function(focusedItem, idNum) {
    // create new elements
    var progressBar = document.createElement("div");
    var progressState = document.createElement("div");
    // var successIconSvg = document.createElement("svg");
    // var path = document.createElement("path");
    var successIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path")

    // set attributes
    progressBar.classList.add("progressBar");
    progressBar.setAttribute("id", "progressBar" + idNum);
    progressState.classList.add("progressState");
    successIconSvg.classList.add("successIconSvg");
    path.classList.add("successIconSvgPath");
    path.setAttribute("d", "M1 10 L5 14 L14 3");

    // set handler on path element for showing successful icon when the progress at the end
    progressState.addEventListener("animationend", function(e) {
      finishUploadingDisplay(path, e);
    });

    // append children
    successIconSvg.appendChild(path);
    progressBar.appendChild(progressState);
    progressBar.appendChild(successIconSvg);

    return progressBar;
  }

  // set focus state when the file clicked
  var focusFileItem = function(fileObj) {
    // js will detect the class "focusedFile" to upload files
    fileObj.classList.add("focusedFile");
    fileObj.firstElementChild.style.color = "#000";
    var fileObjSvgChild = fileObj.firstElementChild.nextElementSibling;
    fileObjSvgChild.firstElementChild.classList.add("foucsFileSvg");
    fileObjSvgChild.lastElementChild.classList.add("foucsFileCornerSvg");
  };

  // blur focus state after files have been upload
  var blurFileItem = function(fileObj, idNum) {
    // remove focus property
    // remove progressbar
    setTimeout(function() {
      fileObj.classList.remove("focusedFile");
      fileObj.removeChild(fileObj.lastElementChild);
      fileObj.firstElementChild.style.color = "#FFF";
      var fileObjSvgChild = fileObj.firstElementChild.nextElementSibling;
      fileObjSvgChild.firstElementChild.classList.remove("foucsFileSvg");
      fileObjSvgChild.lastElementChild.classList.remove("foucsFileCornerSvg");
    }, 3500);
  }

  var openWindow = function() {
    folderCover.style.animation = "openFolderCover 0.3s ease forwards";
    setTimeout(function() {
      folderFile.style.animation = "openFile 0.5s ease forwards";
      folderFileBefore.style.top = "-15px";
      folderFileBefore.style.left = "-15px";
      folderFileBefore.style.opacity = 1;
    }, 300);
    setTimeout(function() {
      folderCover.style.zIndex = "-2";
      // show file content
      fileHeader.style.opacity = 1;
      fileContainer.style.opacity = 1;
    }, 700);
  };

  var closeWindow = function() {
    fileHeader.style.opacity = 0;
    fileContainer.style.opacity = 0;
    folderFileBefore.style.opacity = 0;
    setTimeout(function() {
      folderFile.style.animation = "closeFile 0.5s ease forwards";
      folderFileBefore.style.top = "-15px";
      folderFileBefore.style.left = "-15px";
    }, 400);
    setTimeout(function() {
      folderCover.style.zIndex = "0";
      folderCover.style.animation = "closeFolderCover 0.3s ease forwards";
    }, 700);
  };

  return {
    init: function() {
      openWindow();
      setClickHandler();
    }
  }

}(window));

window.onload = myFolder.init;
