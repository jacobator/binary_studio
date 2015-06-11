$(function() {
	var initVal;
	var goodsList = $("#goods-list");
	//adding new goods item
	$("#input").on("keyup", function(e) {
		if (e.keyCode == 13 && $(this).val()) {
			goodsList.append('<li class="goods-item"><input class="checkbox" type="checkbox"><input class="goods-name" \
				type="text" value="' + $(this).val() + '" readonly><a href class="btn-delete">&#x2716;</a></li>');
			$(this).val("");
		}
	});

	//selecting goods item to edit
	goodsList.on("dblclick", ":not(.selected) > .goods-name[readonly]", function() {
		$(this).prop("readonly", false);
		initVal = $(this).val();
	});

	//editing goods item
	goodsList.on("keyup focusout", ".goods-name:not([readonly])", function(e) {
		if (e.keyCode == 13) {
			$(this).prop("readonly", true);
		}
		else if (e.keyCode == 27 || e.type == "focusout") {
			$(this).prop("readonly", true);
			$(this).val(initVal);
		}
	});

	goodsList.on("click", ".btn-delete", function(e) {
		$(this).parent().remove();
		e.preventDefault();
	});

	goodsList.on("change", ".checkbox", function() {
		if (this.checked) {
			$(this).parent().addClass("selected");
		}
		else {
			$(this).parent().removeClass("selected");
		}
	});

	//global controls
	$("#mark-all").change(function() {
		if (this.checked) {
			$(".goods-item").addClass("selected");
			$("#goods-list .checkbox").prop("checked", true);
		}
		else {
			$(".goods-item").removeClass("selected");
			$("#goods-list .checkbox").prop("checked", false);
		}
	});

	$("#btn-delete-selected").click(function() {
		$("#goods-list .selected").remove();
		$("#mark-all").prop("checked", false);
	});
});