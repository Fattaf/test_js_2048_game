(function () {

  // for test only
  fillDraw = function(matrixArray, n) {
    for(var i = 0; i < n; i++) {
      for(var j = 0; j < n; j++) {
        var tmpVal = '';
        if (matrixArray[i][j] !== undefined) {
          tmpVal = matrixArray[i][j]
        };
        $('#cell_' + i + '_' + j).text(tmpVal);
      };
    };
  };

  countNullList = function(matrixArray, n) {
    var nullList = [];
    for(var i = 0; i < n; i++) {
      for(var j = 0; j < n; j++) {
        var tmpVal = 0;
        if (matrixArray[i][j] === undefined) {
          nullList.push(i * 10 + j);
        };
      };
    };
    return nullList;
  };

  fillCellRandomly = function(matrixArray, n) {
    var nullList = countNullList(matrixArray, n);
    var num = 0;
    var randValue = (Math.floor(1+(Math.random()*2)))*2;

    switch (nullList.length) {
      case 0:
        return false;
      case 1:
        matrixArray[Math.floor(nullList[num]/10)][nullList[num]%10] = randValue;
        break;
      default:
        num = Math.floor(Math.random()*nullList.length);
        matrixArray[Math.floor(nullList[num]/10)][nullList[num]%10] = randValue;
      };
    return true;
  };

  makeMatrix = function(array, n) {
    for(var i = 0; i < n; i++) { array[i] = new Array(n) }
  };

  isNoVariants = function(matrixArray, n) {
    for(var i = 0; i < n; i++) {
      for(var j = 0; j < n; j++) {
        if (((j+1 < n) && (matrixArray[i][j] == matrixArray[i][j+1])) ||
            ((j-1 > 0) && (matrixArray[i][j] == matrixArray[i][j-1])) ||
            ((i+1 < n) && (matrixArray[i][j] == matrixArray[i+1][j])) ||
            ((i-1 > 0) && (matrixArray[i][j] == matrixArray[i-1][j]))) {
          return false;
          };
        };
      };
    return true;
  };

  isFullGrid = function(matrixArray, n) {
    for(var i = 0; i < n; i++) {
      for(var j = 0; j < n; j++) {
        if ((matrixArray[i][j] == undefined) || (matrixArray[i][j] == null))  {
          return false;
        };
      };
    };
    return true;
  };

  isFail = function(matrixArray, n) {
    if ((isFullGrid(matrixArray, n)) && (isNoVariants(matrixArray, n))) {
      return true;
    };
    return false;
  };

  isWin = function(matrixArray, n, etalonNum) {
    for(var i = 0; i < n; i++) {
      for(var j = 0; j < n; j++) {
        if (matrixArray[i][j] == etalonNum) {
          return true;
        };
      };
    };
    return false;
  };

  pushLeft = function(matrixArray, n) {
    for(var i = 0; i < n; i++) {
      for(var j = 0; j < n; j++) {
        if ((matrixArray[i][j] !== undefined) && (j > 0)) {
          switch (matrixArray[i][j-1]) {
            case undefined:
              matrixArray[i][j-1] = matrixArray[i][j];
              matrixArray[i][j] = undefined;
              j = j - 2;
              break;
            case matrixArray[i][j]:
              matrixArray[i][j-1] = matrixArray[i][j-1] + matrixArray[i][j];
              matrixArray[i][j] = undefined;
              break;
          };
        };
      };
    };
  };

  pushUp = function(matrixArray, n) {
    for(var i = 0; i < n; i++) {
      for(var j = 0; j < n; j++) {
        if ((matrixArray[j][i] !== undefined) && (j > 0)) {
          switch (matrixArray[j-1][i]) {
            case undefined:
              matrixArray[j-1][i] = matrixArray[j][i];
              matrixArray[j][i] = undefined;
              j = j - 2;
              break;
            case matrixArray[j][i]:
              matrixArray[j-1][i] = matrixArray[j-1][i] + matrixArray[j][i];
              matrixArray[j][i] = undefined;
              break;
          };
        };
      };
    };
  };

  pushDown = function(matrixArray, n) {
    for(var i = 0; i < n; i++) {
      for(var j = (n-1); j >= 0; j--) {
        if ((matrixArray[j][i] !== undefined) && (j < (n-1))) {
          switch (matrixArray[j+1][i]) {
            case undefined:
              matrixArray[j+1][i] = matrixArray[j][i];
              matrixArray[j][i] = undefined;
              j = j + 2;
              break;
            case matrixArray[j][i]:
              matrixArray[j+1][i] = matrixArray[j+1][i] + matrixArray[j][i];
              matrixArray[j][i] = undefined;
              break;
          };
        };
      };
    };
  };

  pushRight = function(matrixArray, n) {
    for(var i = 0; i < n; i++) {
      for(var j = (n-1); j >= 0; j--) {
        if ((matrixArray[i][j] !== undefined) && (j < (n-1))) {
          switch (matrixArray[i][j+1]) {
            case undefined:
              matrixArray[i][j+1] = matrixArray[i][j];
              matrixArray[i][j] = undefined;
              j = j + 2;
              break;
            case matrixArray[i][j]:
              matrixArray[i][j+1] = matrixArray[i][j+1] + matrixArray[i][j];
              matrixArray[i][j] = undefined;
              break;
          };
        };
      };
    };
  };

// ---------------------------------------------------------------

  var winValue = 2048;
  var arrayLength = 4;
  var field = new Array(arrayLength);

  // initialization
  makeMatrix(field, arrayLength);
  fillCellRandomly(field, arrayLength);


  // event holder
  $(document).ready(function () {
    fillDraw(field, arrayLength);

    $(document).keyup(function (event) {
      var code = event.keyCode;

      if ((code == 37) || (code == 38) || (code == 39) || (code == 40)) {
        switch (event.keyCode) {
          case 37: // left
            pushLeft(field, arrayLength);
            break;
          case 38: // up
            pushUp(field, arrayLength);
            break;
          case 39: // right
            pushRight(field, arrayLength);
            break;
          case 40: // down
            pushDown(field, arrayLength);
            break;
          };

        fillDraw(field, arrayLength);
        fillCellRandomly(field, arrayLength);
        fillDraw(field, arrayLength);

        if (isWin(field, arrayLength, winValue)) { alert("Win"); };
        if (isFail(field, arrayLength)) { alert("Fail") };
      };
    });
  });

})();