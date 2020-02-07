 
    var app = new Vue({
        
        el: '#app',
        data: {
            message: 'Hello Vue!', 
            palabras: palabrasR,
            cadenaDePalabras : [],
      enunciadoText : '',
      procesarBAN : true,
      crearVariables : true,
      palabraFormada : "",
      listaVariables : [],
      matrizA : [],
      enunciadoModal: false,
      consejosModal : false,
      ledT : {
          "nodes":
          [
          ],
    
          "links":
          [
                
          ]
    }
        },
        mounted() {
    this.$forceUpdate();
      },
      // define methods under the `methods` object
      methods: {
        procesarT: function () {
        if (this.enunciadoText != '') {
            this.enunciadoText = this.enunciadoText.toLocaleLowerCase();
        this.enunciadoText = this.enunciadoText.replace(/[.*,+?^${}():\n|[\]\\]/g, '');
        this.cadenaDePalabras = this.enunciadoText.split(" ");
        console.log(this.cadenaDePalabras);
        for (let index = 0; index < 2; index++) {
          this.cadenaDePalabras.forEach(element => { 
            this.palabras.palabras.forEach(p => { 
              if (element == p) { 
                this.removeItemFromArr( this.cadenaDePalabras, p );
                return; 
              } 
            });
          });
          }
    
          console.log(this.cadenaDePalabras);
        this.procesarBAN = false;
        
        } else {
        alert("Debes escribir un enunciado para continuar.")    
        }
        },
        removeItemFromArr ( arr, item ) {
        var i = arr.indexOf( item );
     
        if ( i !== -1 ) {
            arr.splice( i, 1 );
        }
          },
          agregarPalabra: function (item) {
            if (item != '') {
                this.palabraFormada = this.palabraFormada + " " + item;
            }
          },
          agregarVariable: function () {
            if (this.palabraFormada) {
                this.listaVariables.push(this.palabraFormada);
        this.palabraFormada = "";
            }
          },
          crearMatrizA : function() {
            if (this.listaVariables.length != 0) {

                this.listaVariables.forEach(element => {
                    console.log(element);
                    
                    this.matrizA[element] = [];
                  });
                  this.listaVariables.forEach(element => {
                    this.listaVariables.forEach(e => {
                      this.matrizA[element].push({
                        var: e,
                        inc: 'ø'
                      })
                    });
                  });
                  console.log(this.matrizA);
                  
                  this.crearVariables = false;
             }
        
      },deleteTask: function (index) {
        this.listaVariables.splice(index, 1);
    },
      cambiarIncidencia: function (varI, varF, i) {
        this.matrizA[varI].forEach(element => {
          if (element.var == varF) {
            switch (element.inc) {
              case '+':
                element.inc = '-';
                break;
              case '-':
                element.inc = 'ø';
                break;
              case 'ø':
                element.inc = '+';
                break;    
            }
          }
        });
        this.$forceUpdate();
      },
      generarDiagrama: function() {
        this.ledT = {
          "nodes":
          [
          ],
    
          "links":
          [
                
          ]
    };
    // d3.selectAll("svg > *").remove(); // Operación borra lo que está dentro del svg pero elimina las edgelabels
        console.log(this.matrizA);
        this.listaVariables.forEach((e,i) => {
            this.ledT.nodes.push({
            name: e,
            label: '',
            id: i+1
        });
             
            this.matrizA[e].forEach(z => {
                console.log(z);
                
                if (z.inc == '+') {
                    this.ledT.links.push({
                        source: this.listaVariables.indexOf(e)+1,
                        target: this.listaVariables.indexOf(z.var)+1,
                        type: '+'
                    });
                } else if (z.inc == '-') {
                    this.ledT.links.push({
                        source: this.listaVariables.indexOf(e)+1,
                        target: this.listaVariables.indexOf(z.var)+1,
                        type: '-'
                    });
                } else {
                    console.log("Vacio");
                    
                }
                
            });
            
            
        });
        
        
    
        console.log(this.ledT);
        update(this.ledT.links, this.ledT.nodes);
        this.$forceUpdate();
      }
      }
        });
    
      
    