        
        //This file POST'ed from a form to an endpoint written in PHP "insert.php" using AJAX query and inserted data 
        //in MYSQL Database.
        
        
        
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

        <script type="text/javascript">

            $(document).ready(function() {
                $("#sidebar").mCustomScrollbar({
                    theme: "minimal"
                });

                $('#sidebarCollapse').on('click', function() {
                    $('#sidebar, #content ,#topbar').toggleClass('active');
                    $('.collapse.in').toggleClass('in');
                });

                $("#modal_batch").text("");
                $("#modal_place").text("");
                $("#modal_type").text("");
                $("#modal_agency").text("");
                $("#batch").text("");
                $("#place").text("");
                $("#type").text("");
                $("#agency").text("");



            });




            function change() {
                $("#doi").val($("#doi").val().toUpperCase());
                $("#title").val($("#title").val().toUpperCase());
                $("#publisher").val($("#publisher").val().toUpperCase());
                $("#publisher").val($("#publisher").val().toUpperCase());
                $("#authorName").val($("#authorName").val().toUpperCase());
                $("#categoryName").val($("#categoryName").val().toUpperCase());
            }

            
            $("#generateqr").click(function() {
               $("#formmain").submit();
            });


            $("#formmain").bind('submit', function() {
                $(window).unbind('beforeunload');
            });


            function bsubmit() {

                var doi = $("#doi").val().toUpperCase();
                var title = $("#title").val().toUpperCase();
                var publisher = $("#publisher").val().toUpperCase();
                var pub_date = $("#pub_date").val().toUpperCase();
                var authorName = $("#authorName").val().toUpperCase();
                var authorId = $("#authorId").val().toUpperCase();
                var categoryName = $("#categoryName").val().toUpperCase();
                var categoryId = $("#categoryId").val().toUpperCase();
                var status = $("input[name=status]:checked").val().toUpperCase();
                if (doi != "" && doi != null) {
                    $.ajax({
                        type: "POST",
                        url: 'insert.php',
                        data: {
                            doi: doi,
                            title: title,
                            publisher: publisher,
                            pub_date: pub_date,
                            authorName: authorName,
                            authorId: authorId,
                            categoryName: categoryName,
                            categoryId: categoryId,
                            status: status
                        },
                        success: function(data) {
                            if(data.includes("Success"))
                            swal("Success", "Query successfully.", "success");
                            else
                            swal("Failed", "Query unsuccessfull .", "error");

                        },

                    })
                }

            }
        </script>
