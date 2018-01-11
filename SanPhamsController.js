var sanPhamsController = new Object();
//xoa 1 san pham
sanPhamsController.deleteProduct = function () {
    //camel case function name javascript
    var deleteProduct = function() {
        $(".js-delete-product").click(function (e) {
            var link = $(e.target);
            var confirmDeleteProduct = confirm("Ban co chac xoa khong?");
            if (confirmDeleteProduct) {
                $.ajax({
                    url: "/api/SanPhams/" + link.attr("data-product-id"),
                    type: "DELETE",
                    success: function () {
                        link.parents("tr").fadeOut(function () {
                            $(this).remove();
                        });
                    },
                    error: function () {
                        alert("Xoa that bai!");
                    }
                });
            }
        });
    }

    return {
        init: deleteProduct
    }
}();

//them 1 san pham
sanPhamsController.addProduct = function () {

    var addProduct = function() {
        //Ajax them nhanh san pham
        $("#formCreateNewProduct").submit(function (e) {
            e.preventDefault();
            //Buoc 1: Lay thong tin va dong goi san pham
            var sanPham = new Object();
            sanPham.TenSanPham = $("input[name='tenSanPham']").val();
            sanPham.GiaSanPham = $("input[name='giaSanPham']").val();
            //Buoc 2: Goi API Post du lieu san pham ve server
            $.post("/api/SanPhams", sanPham)
                .done(function (maSanPham) {
                    //post thanh cong
                    alert("Thanh cong");
                    //insert 1 dong vao bang du lieu san pham
                    var actionLink = "<a href='/SanPhams/Edit/" + maSanPham + "'>Edit</a> | <a href='/SanPhams/Details/" + maSanPham + "'>Details</a> | <a href='#' class='js-delete-product' data-product-id=" + maSanPham + ">Delete</a>";

                    var newRow = "<tr><td> <input type='checkbox' name='chkProduct' value="+maSanPham+" /> </td><td>" + sanPham.TenSanPham + "</td><td>" + sanPham.GiaSanPham + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>" + actionLink + "</td></tr>";
                    $("table tbody").prepend(newRow);

                    sanPhamsController.deleteProduct.init();
                })
                .fail(function () {
                    //post that bai
                    alert("That bai");
                });
            //Buoc 3: Cap nhat danh sach san pham
        });
    }

    return {
        init: addProduct
    }
}();

//Dong mo form nhap nhanh san pham
sanPhamsController.toggleAddProduct = function () {

    var toggleAddProduct = function() {
        //Toggle Them nhanh san pham
        $(".create-sanpham-toggle h5").click(function () {
            $(".create-sanpham-toggle .widget-content").toggle();
        });
    }

    return {
        init: toggleAddProduct
    }
}();