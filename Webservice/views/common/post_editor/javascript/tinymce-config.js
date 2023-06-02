tinymce.init({
	selector: "textarea#tinymce_editor",
	menubar: false,
	resize: true,
	skin: "oxide-dark",
	content_css: "dark",
	plugins: [
		"fullscreen"
	],
	toolbar: "undo redo | casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify |  bullist numlist checklist outdent indent | fullscreen |"
});