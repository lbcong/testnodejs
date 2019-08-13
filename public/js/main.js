'use strict';

$(document).ready(function(){
	// Show addForm
	$('#addForm').show();
	$('#editForm').hide();

	$('.delete-btn-comment').on('click', function(){
		if (confirm('Delete comment?')){
			var id = $(this).data('id');
			// delete comment
			
		}
	});

	$('#addForm').on('submit', function(event){
		event.preventDefault();
		var productId = $(this).data('product');
		var comment = $('#addComment').val();
        // add comment
        
	});

	// Show editForm
	$('.edit-btn-comment').on('click', function(){
		$('#editComment').val($(this).data('comment'));		
		$('#commentId').val($(this).data('id'));
		$('#editForm').show();
		$('#addForm').hide();	
	});

	// Hide editForm
	$('#cancelEdit').on('click', function(){
		$('#addForm').show();
		$('#editForm').hide();
	});

	$('#editForm').on('submit', function(event){
		event.preventDefault();
		var id = $('#commentId').val();
		var comment = $('#editComment').val();
		// update comment
		
	});
});