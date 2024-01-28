<script lang="ts">
    import type { BoardContentTaskForm } from "$lib/interfaces/task";
    export let task: BoardContentTaskForm;

    // some pre-processing
    if (task.task_label_color == null) {
        task.task_label_color = "#FFFFFF";
    }

    function showable_date(date: string): string {
        let date_obj = new Date(date);
        return date_obj.toDateString();
    }

    function remaining_time(date: string): string {
        let date_obj = new Date(date);
        let now = new Date();
        let diff = date_obj.getTime() - now.getTime();
        if (diff < 0) {
            return "Overdue";
        }
        let diff_days = Math.floor(diff / (1000 * 3600 * 24));
        let diff_hours = Math.floor((diff / (1000 * 3600)) % 24);
        let diff_minutes = Math.floor((diff / 1000 / 60) % 60);
        let diff_seconds = Math.floor((diff / 1000) % 60);
        return (
            diff_days + " days, " + diff_hours + " hours "
            //  +
            // diff_minutes +
            // " minutes"
            // +
            // diff_seconds +
            // " seconds"
        );
    }
    let rem_time: string = remaining_time(task.task_deadline);

    // Find a contrasting color for the text
    let text_color: string;

    // YIQ Equation
    function get_contrast_YIQ(hex_color: string): string {
        let red: number = parseInt(task.task_label_color.substring(1, 3), 16);
        let green: number = parseInt(task.task_label_color.substring(3, 5), 16);
        let blue: number = parseInt(task.task_label_color.substring(5, 7), 16);
        let yiq: number = (red * 299 + green * 587 + blue * 114) / 1000;
        if (yiq >= 128) {
            return "#000000";
        } else {
            return "#FFFFFF";
        }
    }

    // WCAG 2.0
    function relative_luminance(
        red: number,
        green: number,
        blue: number,
    ): number {
        const a = [red, green, blue].map((v) => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    function contrast_ratio(l1: number, l2: number): number {
        return (l1 + 0.05) / (l2 + 0.05);
    }

    function get_contrasting_color_WCAG(hex_color: string): string {
        const R = parseInt(hex_color.slice(1, 3), 16);
        const G = parseInt(hex_color.slice(3, 5), 16);
        const B = parseInt(hex_color.slice(5, 7), 16);

        const luminance = relative_luminance(R, G, B);
        const darkTextLuminance = relative_luminance(0, 0, 0);
        const lightTextLuminance = relative_luminance(255, 255, 255);

        const darkRatio = contrast_ratio(darkTextLuminance, luminance);
        const lightRatio = contrast_ratio(luminance, lightTextLuminance);

        return darkRatio > lightRatio ? "#000000" : "#FFFFFF";
    }

    // Another generic method
    function invert_color(hex: string, bw: boolean): string {
        if (hex.indexOf("#") === 0) {
            hex = hex.slice(1);
        }

        // Invert color components
        let r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
            g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
            b = (255 - parseInt(hex.slice(2, 4), 16)).toString(16);

        // Pad each with zeros and return
        r = r.padStart(2, "0");
        g = g.padStart(2, "0");
        b = b.padStart(2, "0");

        // Get inverted color
        let invertedColor = `#${r}${g}${b}`;

        if (bw) {
            // If the inverted color is too close to the original one, use bw contrast
            const bwContrast =
                parseInt(hex, 16) > 0xffffff / 2 ? "#000000" : "#FFFFFF";
            const iY =
                0.299 * parseInt(r, 16) +
                0.587 * parseInt(g, 16) +
                0.114 * parseInt(b, 16);
            const oY =
                0.299 * parseInt(hex.slice(0, 2), 16) +
                0.587 * parseInt(hex.slice(2, 4), 16) +
                0.114 * parseInt(hex.slice(4, 6), 16);
            // Calculate contrast
            const contrast = Math.abs(iY - oY);
            // If contrast is too low, return bw contrast instead
            if (contrast < 60) {
                return bwContrast;
            }
        }

        return invertedColor;
    }

    // text_color = invert_color(task.color, true);
    text_color = get_contrast_YIQ(task.task_label_color);
</script>

<div
    class="p-2 rounded cursor-pointer bg-accent-200 dark:bg-accent-700 dark:text-gray-300"
    style="background-color : {task.task_label_color}; color : {text_color}"
>
    <a target="_self" href={"/tasks/" + task.task_id}>
        <div class="font-bold text-md">{task.task_name}</div>
        <div>Due Date: {showable_date(task.task_deadline)}</div>
        {#if rem_time == "Overdue"}
            <div class="font-bold text-red-500">
                {rem_time}
            </div>
        {:else}
            <div>Remaining Time: {rem_time}</div>
        {/if}
    </a>
</div>
