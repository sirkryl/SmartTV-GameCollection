package com.fdts.tabletdraw;

import com.fdts.tabletdraw.R;
import com.movl.connect.model.IMCUser;
import com.movl.connect.model.MCData;

import android.gesture.GestureOverlayView;
import android.gesture.GestureOverlayView.OnGestureListener;
import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class DrawActivity extends MainActivity {

	private Button button_clear;

	private Button button_submit;

	private Button button_skip;

	private EditText chat_content;

	private TextView text_draw;

	private GestureOverlayView gesture;

	private OnGestureListener gestureListener;

	private boolean active = false;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		setContentView(R.layout.draw);

		gesture = (GestureOverlayView) findViewById(R.id.gestures);
		gestureListener = new GestureListener();
		gesture.addOnGestureListener(gestureListener);
		gesture.setGestureVisible(false);
		text_draw = (TextView) findViewById(R.id.text_draw);
		chat_content = (EditText) findViewById(R.id.chat_content);
		button_submit = (Button) findViewById(R.id.button_submit);
		button_submit.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View arg0) {
				try {
					MCData data = new MCData();
					data.put("text", chat_content.getText().toString());
					Log.i(Connect.LOG_TAG, "sendingAnswer: " + chat_content.getText().toString());
					app.getClient().sendToHosts("answer", data);
					chat_content.setText("");

				}
				catch (Exception e) {
					e.printStackTrace();
					Toast.makeText(DrawActivity.this, "No draw on the string", Toast.LENGTH_SHORT).show();
				}
			}
		});
		button_clear = (Button) findViewById(R.id.button_clear);
		button_clear.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View arg0) {
				try {
					MCData data = new MCData();
					data.put("text", "clear");
					app.getClient().sendToHosts("clear", data);
					gesture.cancelClearAnimation();
					gesture.clear(true);
				}
				catch (Exception e) {
					e.printStackTrace();
					Toast.makeText(DrawActivity.this, "No draw on the string", Toast.LENGTH_SHORT).show();
				}
			}
		});

		button_skip = (Button) findViewById(R.id.button_skip);
		button_skip.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View arg0) {
				try {
					gesture.cancelClearAnimation();
					gesture.clear(true);
					gesture.setGestureVisible(false);
					button_skip.setEnabled(false);
					button_clear.setEnabled(false);
					button_submit.setEnabled(true);
					chat_content.setEnabled(true);
					active = false;
					text_draw.setText("Rate!");
					MCData data = new MCData();
					data.put("text", "skip");
					app.getClient().sendToHosts("skip", data);
				}
				catch (Exception e) {
					e.printStackTrace();
					Toast.makeText(DrawActivity.this, "No draw on the string", Toast.LENGTH_SHORT).show();
				}
			}
		});
	}

	@Override
	public void onMessage(final IMCUser sender, final String messageId, final MCData messageData, final String target) {
		this.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				Log.i(Connect.LOG_TAG, "USER_onMESSAGE" + sender + " messageId:" + messageId + " messageData:"
						+ messageData + " target:" + target);
				if (messageId.equals("activate")) {
					String message = messageData.getString("text");
					text_draw.setText("Zeichne ein(e) " + message + "!");
					//Toast.makeText(DrawActivity.this, "activate: " + message, Toast.LENGTH_SHORT).show();
					gesture.cancelClearAnimation();
					gesture.clear(true);
					gesture.setGestureVisible(true);
					button_skip.setEnabled(true);
					button_clear.setEnabled(true);
					button_submit.setEnabled(false);
					chat_content.setEnabled(false);
					active = true;
				}
				else if (messageId.equals("deactivate")) {
					//Toast.makeText(DrawActivity.this, "deactivate:", Toast.LENGTH_SHORT).show();
					text_draw.setText("Rate!");
					gesture.cancelClearAnimation();
					gesture.clear(true);
					gesture.setGestureVisible(false);
					button_skip.setEnabled(false);
					button_clear.setEnabled(false);
					button_submit.setEnabled(true);
					chat_content.setEnabled(true);
					active = false;
				}

			}

		});
	}

	class GestureListener implements OnGestureListener {

		@Override
		public void onGesture(GestureOverlayView overlay, MotionEvent event) {
			if (active) {
				try {
					int x = (int) event.getX();
					int y = (int) event.getY();
					MCData data = new MCData();
					data.put("text", x + "x" + y + "y");
					app.getClient().sendToHosts("draw", data);

				}
				catch (Exception e) {
					e.printStackTrace();
					Toast.makeText(DrawActivity.this, "No draw on the string", Toast.LENGTH_SHORT).show();
				}
			}

		}

		@Override
		public void onGestureCancelled(GestureOverlayView overlay, MotionEvent event) {
			if (active) {
				try {
					MCData data = new MCData();
					data.put("text", "onGestureCancelled!");
					app.getClient().sendToHosts("stop", data);

				}
				catch (Exception e) {
					e.printStackTrace();
					Toast.makeText(DrawActivity.this, "No draw on the string", Toast.LENGTH_SHORT).show();
				}
			}
		}

		@Override
		public void onGestureEnded(GestureOverlayView overlay, MotionEvent event) {
			if (active) {
				try {
					MCData data = new MCData();
					data.put("text", "end");
					app.getClient().sendToHosts("stop", data);

				}
				catch (Exception e) {
					e.printStackTrace();
					Toast.makeText(DrawActivity.this, "No draw on the string", Toast.LENGTH_SHORT).show();
				}
			}

		}

		@Override
		public void onGestureStarted(GestureOverlayView overlay, MotionEvent event) {
			if (active) {
				try {
					int x = (int) event.getX();
					int y = (int) event.getY();
					MCData data = new MCData();
					data.put("text", "start" + x + "x" + y + "y");
					app.getClient().sendToHosts("start", data);

				}
				catch (Exception e) {
					e.printStackTrace();
					Toast.makeText(DrawActivity.this, "No draw on the string", Toast.LENGTH_SHORT).show();
				}
			}

		}

	}

}
