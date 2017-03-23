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

  var setClickHandler = function() {
    // file items handler
    var fileItems = document.getElementsByClassName("fileItem");
    for(var i = 0 ; i < fileItems.length ; i++) {
      fileItems[i].addEventListener("click", function() { focusFileItem(this);});
    }

    // upload button handler
    uploadButton.addEventListener("click", uploadFiles);
  }

  var uploadFiles = function() {
    var focusedFileArray = document.getElementsByClassName("focusedFile");
    for(var i = 0 ; i < focusedFileArray.length ; i++) {
      createProgressBar(focusedFileArray[i]);
    }
  };

  var createProgressBar = function(focusedItem) {

  }

  // set focus state when the file clicked
  var focusFileItem = function(fileObj) {
    fileObj.classList.add("focusedFile");
    fileObj.firstElementChild.style.color = "#000";
    var fileObjSvgChild = fileObj.firstElementChild.nextElementSibling;
    fileObjSvgChild.firstElementChild.classList.add("foucsFileSvg");
    fileObjSvgChild.lastElementChild.classList.add("foucsFileCornerSvg");
  };

  var openFileAnimation = function() {
    folderCover.style.animation = "openFolderCover 0.3s ease forwards";
    setTimeout(function() {
      folderFile.style.animation = "maximizeFileSize 0.5s ease forwards";
      folderFileBefore.style.top = "-15px";
      folderFileBefore.style.left = "-15px";
      folderFileBefore.style.opacity = 1;
    }, 300);
    setTimeout(function() {
      folderCover.style.visibility = "hidden";
      // show file content
      fileHeader.style.opacity = 1;
      fileContainer.style.opacity = 1;
      mouse.style.opacity = 1;
    }, 700);
  };

  return {
    init: function() {
      openFileAnimation();
      setClickHandler();
    }
  }

}(window));

window.onload = myFolder.init;
