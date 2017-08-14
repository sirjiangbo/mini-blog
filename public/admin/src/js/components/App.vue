<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script>
	import Checkbox from 'iview/src/components/checkbox';

	export default {
		data() {
			return {
				single: false,
				msg: 'world'
			}
		},
		components: {
			Checkbox
		}
	};
</script>