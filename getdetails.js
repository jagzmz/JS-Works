//Gets detail from getdata.php

<script type="text/javascript">
      $(document).ready(function() {
        $('#sidebarCollapse').on('click', function() {
          $('#sidebar, #content ,#topbar').toggleClass('active');
          $('.collapse.in').toggleClass('in');
        });
      });



      function selectacoordingto() {

        $("#default1").remove();
        $("#enterkeyword").show();
        $("#enterkeyword").animate({
          opacity: 1
        }, 500);
        $("#enter_keyword").text("Enter " + $("#sel1 option:selected").text() + "  :")
        keyword();
      }

      function keyword() {
        $("#resultsno").text("");

        $("#cards").html("");
        var keyword = $("#keyword").val().toUpperCase();
        if (keyword != "" && keyword != null) {
          var according = $("#sel1 option:selected").val();
          $.ajax({
            type: "POST",
            url: 'getdata.php',
            data: {
              according: according,
              keyword: keyword
            },
            success: function(data) {
              $("#total").show();
              //  alert(data);
              var row1 = data.split("HARSH");
              $("#resultsno").text(row1.length - 1);
              for (var i = 0; i < row1.length - 1; i++) {
                var r = row1[i];
                // alert(r);
                var rowdata = r.split(":;");
                $("#cards").append("<div class='card' style='margin-top:10px'>"
                                    +"<div class='card-body'>"
                                      +"<h4 class='card-title' id='row_no'>Card title</h4>"
                                        +"<h6 class='card-title' id='decrypt_no'>Card title</h6>"
                                        +"<h6 class='card-text' id='sample_no' >Some example text. Some example text.</h6>"
                                        +"<h6 class='card-text' id='batch_no'>Some example text. Some example text.</h6>"
                                        +"<h6 class='card-text' id='place_no'>Some example text. Some example text.</h6>"
                                        +"<h6 class='card-text' id='type_no'>Some example text. Some example text.</h6>"
                                        +"<h6 class='card-text' id='agency_no'>Some example text. Some example text.</h6>"
                                        +"<h6 class='card-text' id='result_no'>Some example text. Some example text.</h6>"
                                    +"</div>"
                                  +"</div>");
                $('#row_no').attr('id', "row_no" + i);
                $('#decrypt_no').attr('id', "decrypt_no" + i);
                $('#sample_no').attr('id', "sample_no" + i);
                $('#batch_no').attr('id', "batch_no" + i);
                $('#place_no').attr('id', "place_no" + i);
                $('#type_no').attr('id', "type_no" + i);
                $('#agency_no').attr('id', "agency_no" + i);
                $('#result_no').attr('id',"result_no"+i);

                $('#row_no' + i).text("Result No :    " + (i + 1));
                $('#decrypt_no' + i).text("DOI :    " + rowdata[0]);
                $('#sample_no' + i).text("TITLE :    " + rowdata[1]);
                $('#batch_no' + i).text("PUBLISHER :    " + rowdata[2]);
                $('#place_no' + i).text("DATE OF PUBLISHING :    " + rowdata[3]);
                $('#type_no' + i).text("STATUS :    " + rowdata[4]);
                $('#agency_no' + i).text("AUTHOR :    " + rowdata[5]);
                $('#result_no'+i).text("CATEGORY :    "+rowdata[6]);
                // $('#remarks_no'+i).text("REMARKS :    "+rowdata[7]);
              }
            }
          })
        }

      }
    </script>
